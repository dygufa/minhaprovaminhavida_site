var dotenv          = require('dotenv').config();
    express         = require('express'),
    app             = express(),
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

var sessionSecret = process.env.SESSION_SECRET || 'mySecretKey';
var nodeENV = process.env.NODE_ENV || 'DEV';
var port = process.env.PORT || 5020;
var portWebpack = process.env.PORT_WEBPACK || 5040;

/**
 * Starts webpack-dev-server in case of development mode.
 * You can read more about webpack here: https://webpack.github.io/
 * And about webpack-dev-server here:https://webpack.github.io/docs/webpack-dev-server.html
 */
if (nodeENV == 'DEV') {
    webpackDevServer = require(cwd + '/server/core/webpack-dev-server.js');
}

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

/**
 * In order to use webpack-dev-server for now we have a separed index file.
 * We should probably change that in the future.
 */
app.use(function(req, res, next) {
    if (nodeENV == 'DEV' && req.url == '/') {
        req.url = '/index_dev.html';
    }
    next();
});

// [TEMPORARY] Allows CORS in the express server
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.static(cwd + '/browser/src'));
app.use('/node_modules', express.static(cwd + '/node_modules'));
// to support JSON-encoded bodies
app.use(bodyParser.json());       
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); 
app.use(expressSession({secret: sessionSecret, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Initializes a proxy to the webpack-dev-server through /webpack-dev
 * It's useful in case of change in the port of the webpack-dev-server
 */
if (nodeENV == 'DEV') {
    app.use('/webpack-dev', proxy('localhost:' + portWebpack, {
      forwardPath: function(req, res) {
        return require('url').parse(req.url).path;
      }
    }));
}

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

app.get('/courses', controllers.courses.getIndex);
app.post('/courses', controllers.courses.addCourse);
app.delete('/courses/:id', controllers.courses.removeCourse);

app.get('/universities', controllers.universities.getIndex);
app.post('/universities', controllers.universities.addUniversity);
app.delete('/universities/:id', controllers.universities.removeUniversity);

app.get('/users/isLogged', function(req, res) {
    if (!req.isAuthenticated()) {
        res.json({'data': {'logged': false}});
    } else {
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
    var indexURL = '/browser/src/index.html';
    if (nodeENV == 'DEV') {
        indexURL = '/browser/src/index_dev.html';
    }
    res.sendFile(cwd + indexURL);
})

/**
 * Only starts to listen the respective port after the initialization of the connection with the database.
 */
models.sequelize.sync().then(function() {
    app.listen(port, function (err) {
        if (err) {
            console.error(err)
        } else {
            console.log('App is ready at : ' + port)
        }
    })
});