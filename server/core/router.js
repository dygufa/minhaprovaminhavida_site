var express = require('express'),
    app = express(),
    fs = require('fs')

var cwd = process.cwd();

var controllers = {}, 
    controllers_path = cwd + '/server/controllers'

fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
})

app.use(express.static(cwd + '/public'));
app.use('/node_modules', express.static(cwd + '/node_modules'));

app.get('/files', controllers.files.getIndex)

app.use(function(req, res) {
    res.sendFile(cwd + '/public/index.html')
})

var port = process.env.PORT || 5020;

app.listen(port, function (err) {
    if (err) {
        console.error(err)
    } else {
        console.log('App is ready at : ' + port)
    }
})