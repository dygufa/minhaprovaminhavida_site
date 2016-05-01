var express = require('express'),
    app = express(),
    fs = require('fs'),
    bodyParser = require('body-parser');

var cwd = process.cwd();
var models = require('../models')

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
app.post('/files', controllers.files.addFile)

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