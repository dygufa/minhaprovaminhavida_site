var express     = require('express'),
    app         = express(),
    fs          = require('fs'),
    bodyParser  = require('body-parser'),
    multer      = require('multer');

var cwd = process.cwd();
var models = require('../models');

/*
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: S3_BUCKET,
        acl: 'public-read',
        contentType: function (req, file, cb) {
            cb(null, file.mimetype);
        },
        key: function (req, file, cb) {
            var filename    = slug(file.originalname.replace(/\.[^/.]+$/, "")),
                extension   = mime.extension(file.mimetype);
            cb(null, Date.now().toString() + '-' + filename + '.' + extension)
        }
    })
});*/

var upload = multer({dest: cwd + '/temporary_files'});

var controllers = {}, 
    controllers_path = cwd + '/server/controllers'

fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
})

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static(cwd + '/public'));
app.use('/node_modules', express.static(cwd + '/node_modules'));

app.get('/files', controllers.files.getIndex)
app.post('/files', upload.array("uploads[]", 12), controllers.files.addFile)
app.delete('/files/:id', controllers.files.removeFile)

app.use(function(req, res) {
    res.sendFile(cwd + '/public/index.html')
})

var port = process.env.PORT || 5020;


models.sequelize.sync().then(function() {
    app.listen(port, function (err) {
        if (err) {
            console.error(err)
        } else {
            console.log('App is ready at : ' + port)
        }
    })
});