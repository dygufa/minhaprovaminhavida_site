var fs          = require('fs'),
    models      = require('../models'),
    aws         = require('aws-sdk'),
    slug        = require('slug'),
    mime        = require('mime-types'),
    S3_BUCKET   = process.env.S3_BUCKET;
    Promise     = require('promise');

exports.getIndex = function(req, res) {
	models.file.findAll().then(function (files) {
		res.send(JSON.stringify({'data': files}));
	});
}

function uploadFileToS3(data, callback) {
    var file            = data.file
        filename        = slug(file.originalname.replace(/\.[^/.]+$/, "")),
        extension       = mime.extension(file.mimetype),
        newFilename     = Date.now().toString() + '-' + filename + '.' + extension;

    var fileStream = fs.createReadStream(file.path); 

    var s3obj = new aws.S3({
        params: {
            Bucket: S3_BUCKET, 
            Key: newFilename,
            ContentType: file.mimetype,
            ACL: 'public-read'
        }
    });

    return new Promise(function(resolve, reject) {
        s3obj.upload({Body: fileStream}).send(function(err, data) {
            if (err) {
                return reject(err);
            }

            return resolve(data);
        });
    });    
}

exports.addFile = function(req, res) {
    var formData        = req.body,
        //userId          = req.session.passport.user.userId,
        userId = 4,
        files           = req.files;

    // Upload the file do amazon s3
    models.sequelize.transaction(function(t) {
        var fileData = {
            name: formData.name,
            universityId: formData.universityId,
            status: 1,
            type: formData.typeId,
            createdBy: userId,
            file_raw: files,
            courseId: null
        };

        var createFile = function(fileData, options) {
            return models.file.build(fileData).validate({
                skip: options.skipValidation
            })
            .then(function(validationError) {
                if (validationError) {
                    throw validationError;
                }

                return uploadFileToS3({
                    file: files[0] // first file
                });
            })
            .then(function(fileS3) {
                fileData.file = fileS3.Location;

                return models.file.create(fileData, {
                    transaction: t,
                    validate: false
                });
            });
        }

        if (formData.courseId != 0) {
            fileData.courseId = formData.courseId;

            return createFile(fileData, {
                skipValidation: []
            });
        }

        return models.course.create({
            name: formData.courseName,
            fieldOfStudy: formData.fieldOfStudyId
        }, {transaction: t})
        .then(function(courseEntry) {
            fileData.courseId = courseEntry.id;

            return createFile(fileData, {
                skipValidation: ['courseId']
            });
        });
    })
    .then(function(fileEntry) {
        res.status(200).send(JSON.stringify({'data': fileEntry})); 
    })
    .catch(models.Sequelize.ValidationError, function (err) {
        return res.status(422).send({error: err.errors});
    })
    .catch(function (err) {
        return res.status(400).send({error: err});
    });       
}


exports.removeFile = function(req, res) {
    models.file.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(deleted) {
        if (deleted === 0) {
            res.status(404).send(JSON.stringify({'data': {}}))
        } else {
            res.send(JSON.stringify({'data': {}}))
        }
    });
}