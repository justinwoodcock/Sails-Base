var passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    TwitterStrategy = require('passport-twitter').Strategy;


var verifyHandler = function(token, tokenSecret, profile, done) {
    process.nextTick(function() {
        User.findOne({
            uid: profile.id
        }).done(function(err, user) {
            if (user) {
                return done(null, user);
            } else {

                var data = {
                    provider: profile.provider,
                    uid: profile.id,
                    name: profile.displayName
                };

                if (profile.emails && profile.emails[0] && profile.emails[0].value) {
                    data.email = profile.emails[0].value;
                }
                if (profile.name && profile.name.givenName) {
                    data.fistname = profile.name.givenName;
                }
                if (profile.name && profile.name.familyName) {
                    data.lastname = profile.name.familyName;
                }

                User.create(data).done(function(err, user) {
                    return done(err, user);
                });
            }
        });
    });
};

passport.serializeUser(function(user, done) {
    done(null, user.uid);
});

passport.deserializeUser(function(uid, done) {
    User.findOne({
        uid: uid
    }).done(function(err, user) {
        done(err, user)
    });
});


module.exports = {

    // Init custom express middleware
    express: {
        customMiddleware: function(app) {

            passport.use(new GitHubStrategy({
                    clientID: "1926612ec6ffe3d09f50",
                    clientSecret: "de0c10307b486e4dbe653b3da53f665c8edf1165",
                    callbackURL: "http://localhost:1337/auth/github/callback"
                },
                verifyHandler
            ));

            passport.use(new FacebookStrategy({
                    clientID: "1447555938817942",
                    clientSecret: "0026de10e22009ee74cf5da99d9b1814",
                    callbackURL: "http://localhost:1337/auth/facebook/callback"
                },
                verifyHandler
            ));

            passport.use(new GoogleStrategy({
                    clientID: '38710147289-8tt32b8p2ahgj36ed5rl0auehk6bqn26.apps.googleusercontent.com',
                    clientSecret: 'JUvP-XehepLtY9_XMS4mhj73',
                    callbackURL: 'http://localhost:1337/auth/google/callback'
                },
                verifyHandler
            ));

            passport.use(new TwitterStrategy({
                    consumerKey: 'rOwYNQet04nschwXyj7E4JnDs',
                    consumerSecret: 'vO80Q4tS43S0k54WApzBQZRkwYZ52OQvzNMNw3W0sL1vivysAn',
                    callbackURL: "http://localhost:1337/auth/twitter/callback"
                },
                verifyHandler
            ));

            app.use(passport.initialize());
            app.use(passport.session());
        }
    }

};