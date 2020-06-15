const passport = require('passport'); // Passport library for authentication
const GoogleStrategy = require('passport-google-oauth20'); // Strategy for Google Oauth4
const mongoose = require('mongoose'); 
const keys = require('../config/keys');

const User = mongoose.model('users'); // Get the users collection loaded onto mongoose in models

passport.serializeUser((user, done) => { // serialize the user information to generate unique cookie
    done(null,user.id); // here, user.id is the unique id created by mongo DB for the record
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});


passport.use(
    new GoogleStrategy(
        {  
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true // To allow proxy 
        }, 
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({googleId: profile.id})
            if(existingUser) {
                // We already have a record with profile id
                return done(null, existingUser); // error, record details
            }
            // We need to create a record for new user
            const user = await new User({ googleId: profile.id}).save()
            done(null,user);
        }
    )
);
