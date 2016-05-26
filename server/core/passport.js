var passport            = require('passport'),
    FacebookStrategy    = require('passport-facebook'),
    models              = require('../models');

passport.use('facebook', new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'email', 'name', 'link', 'location', 'picture']
    },
    function(access_token, refresh_token, profile, done) {
        var fbid = profile.id,
            fbEmail = profile.emails[0].value,
            fbFirstName = profile.name.givenName;

        var userSession = {
            'firstName': fbFirstName,
            'email': fbEmail,
            'picture': profile.photos[0].value,
            'provider': 'facebook'
        }

        models.provider.findOne({where: {type: 1, externalId: fbid}}).then(function(provider) {
            if (provider) {
                userSession['userId'] = provider.userId;
                done(null, userSession);
            } else {
                models.user.create({
                    name: fbFirstName,
                    email: fbEmail
                }).then(function(user) {
                    models.provider.create({
                        type: 1, 
                        externalId: fbid,
                        externalToken: access_token,
                        userId: user.id
                    }).then(function(provider) {
                        userSession['userId'] = provider.userId;
                        done(null, userSession);
                    });
                });
            }
        });
    }
));