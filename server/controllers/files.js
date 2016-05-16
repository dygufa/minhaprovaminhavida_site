var fs          = require('fs'),
    models      = require('../models'),
    aws         = require('aws-sdk'),
    slug        = require('slug'),
    mime        = require('mime-types'),
    S3_BUCKET   = process.env.S3_BUCKET;

exports.getIndex = function(req, res) {
	models.File.findAll().then(function (files) {
		res.send(JSON.stringify({'data': files}));
	});
}

exports.addFile = function(req, res) {
    var formData        = req.body,
        file            = req.files[0]
        filename        = slug(file.originalname.replace(/\.[^/.]+$/, "")),
        extension       = mime.extension(file.mimetype),
        newFilename     = Date.now().toString() + '-' + filename + '.' + extension

    var body = fs.createReadStream(file.path);        
    var s3obj = new aws.S3({
        params: {
            Bucket: S3_BUCKET, 
            Key: newFilename,
            ContentType: file.mimetype,
            ACL: 'public-read'
        }
    });
    s3obj.upload({Body: body}).send(function(err, data) { 
        models.File.create({
            name: formData.name,
            professor: formData.professor,
            course: formData.course,
            file: data.Location
        }).then(function(file) {
            res.send(JSON.stringify({'data': req.body}))
        })  
    });    
}

exports.removeFile = function(req, res) {
    models.File.destroy({
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