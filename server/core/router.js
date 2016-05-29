var dotenv          = require('dotenv').config();
    express         = require('express'),
    app             = express(),
    api             = express.Router(),
    fs              = require('fs'),
    bodyParser      = require('body-parser'),
    multer          = require('multer');
    passport        = require('passport'),
    expressSession  = require('express-session'),
    cors            = require('cors'),
    proxy           = require('express-http-proxy');

// Get base directory
var cwd = process.cwd();
var models = require('../models');
// Set directory for temporary uploaded files
var upload = multer({dest: cwd + '/temporary_files'});
var passportStrategies = require(cwd + '/server/core/passport');

var SESSION_SECRET = process.env.SESSION_SECRET || 'mySecretKey';
var NODE_ENV = process.env.NODE_ENV || 'development';
var PORT = process.env.PORT || 5020;

/**
 * Importing controllers classes 
 */
var controllers = {}, 
    controllers_path = cwd + '/server/controllers';

fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file);
    }
})

/**
 * Defining the serialization logic for the sessions exported by passport module.
 */
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser( (sessionUser, done) => {
    done(null, sessionUser);
});

app.use(express.static(cwd + '/browser/build'));
app.use('/node_modules', express.static(cwd + '/node_modules'));
// to support JSON-encoded bodies
app.use(bodyParser.json());       
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); 
app.use(expressSession({secret: SESSION_SECRET, resave: false, saveUninitialized: false}));
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

api.get('/files', controllers.files.getIndex);
api.post('/files', auth, upload.array("uploads[]", 12), controllers.files.addFile);
api.delete('/files/:id', controllers.files.removeFile);

api.get('/courses', controllers.courses.getIndex);
api.post('/courses', controllers.courses.addCourse);
api.delete('/courses/:id', controllers.courses.removeCourse);

api.get('/universities', controllers.universities.getIndex);
api.post('/universities', controllers.universities.addUniversity);
api.delete('/universities/:id', controllers.universities.removeUniversity);

api.get('/users/isLogged', function(req, res) {
    if (!req.isAuthenticated()) {
        res.json({'data': {'logged': false}});
    } else {
        res.json({'data': {'logged': true, 'user': req.session.passport.user}});
    }    
})

api.get('/users/login/facebook', passport.authenticate('facebook', { scope : ['email'] }));
 
api.get('/users/login/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/',
    failureRedirect : '/'
  })
);

app.use('/api', api);

app.use(function(req, res) {
    res.sendFile(cwd + '/browser/build/index.html');
})

/**
 * Only starts to listen the respective port after the initialization of the connection with the database.
 */
models.sequelize.sync().then(function() {
    app.listen(PORT, function (err) {
        if (err) {
            console.error(err)
        } else {
            console.log('App is ready at : ' + PORT);
        }
    })
});