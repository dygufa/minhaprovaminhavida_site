var dotenv          = require('dotenv').config();
    express         = require('express'),
    app             = express(),
    fs              = require('fs'),
    bodyParser      = require('body-parser'),
    multer          = require('multer');
    passport        = require('passport'),
    expressSession  = require('express-session');

var cwd = process.cwd();
var models = require('../models');

var upload = multer({dest: cwd + '/temporary_files'});
var passportStrategies = require(cwd + '/server/core/passport');

var controllers = {}, 
    controllers_path = cwd + '/server/controllers'

fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
})

passport.serializeUser((user, done) => {
    console.log(1, user);
    done(null, user)
})

passport.deserializeUser( (sessionUser, done) => {
    console.log(1, sessionUser);
    done(null, sessionUser)
})

var sessionSecret = process.env.SESSION_SECRET || 'mySecretKey';

app.use(express.static(cwd + '/public'));
app.use('/node_modules', express.static(cwd + '/node_modules'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(expressSession({secret: sessionSecret, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

var auth = function(req, res, next) { 
    if (!req.isAuthenticated()) {
        console.log('Unauthorized');
        res.sendStatus(401);
    } else {
        next();
    }
}; 

app.get('/files', controllers.files.getIndex);
app.post('/files', auth, upload.array("uploads[]", 12), controllers.files.addFile);
app.delete('/files/:id', controllers.files.removeFile);


app.get('/users/isLogged', function(req, res) {
    if (!req.isAuthenticated()) {
        res.json({'data': {'logged': false}});
    } else {
        console.log(3, req.session.passport.user);
        res.json({'data': {'logged': true, 'user': req.session.passport.user}});
    }
    
})

app.get('/users/login/facebook', passport.authenticate('facebook', { scope : ['email'] }));
 
app.get('/users/login/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/',
    failureRedirect : '/'
  })
);

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