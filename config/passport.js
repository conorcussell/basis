var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var secrets = require('./secrets.js');

var User = require('../models/User.js');


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email'
}, function(email, password, done) {
    email = email.toLowerCase();
    User.findOne({
        email: email
    }, function(err, user) {
        if (!user) {
            return done(null, false, {
                message: 'Email ' + email + ' not found'
            });
        }
        user.comparePassword(password, function(err, isMatch) {
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: 'Invalid email or password.'
                });
            }
        });
    });
}));

passport.use(new FacebookStrategy({
  clientID: secrets.facebook.clientID,
  clientSecret: secrets.facebook.clientSecret,
  callbackURL: secrets.facebook.callbackURL,
  profileFields: ['id', 'emails', 'name', 'displayName'],
  enableProof: false
},
function(accessToken, refreshToken, profile, done) {
        var photo = "https://graph.facebook.com/" + profile.id + "/picture";
        User.findOne({
            'facebook.id': profile.id
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                user = new User({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    provider: 'facebook',
                    facebook: {
                        id: profile.id,
                        photo: photo
                    }
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        });
    }
));

exports.isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};
