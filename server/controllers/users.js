var models 			= require('../models');


exports.logout = function(req, res) {
    req.session.destroy();
    return res.redirect('/');
};

exports.isLogged = function(req, res) {
    if (!req.isAuthenticated()) {
        res.json({'data': {'logged': false}});
    } else {
        res.json({'data': {'logged': true, 'user': req.session.passport.user}});
    }  
};

exports.loginFacebook = function(passport) {
	return passport.authenticate('facebook', {
    	scope : ['email'] 
    });  
};

exports.loginFacebookCallback = function(passport) {
	return passport.authenticate('facebook', {
    	successRedirect : '/',
    	failureRedirect : '/'
  	});
}