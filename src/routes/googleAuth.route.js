require("dotenv").config()
const express = require("express")
const router = express.Router()
const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const User = require("../models/user.model")
const userService = require("../services/user.service")

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleTokenStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    },
     async function (accessToken, refreshToken, profile, done) {
        console.log(accessToken, refreshToken, profile, done)

        const email = profile.emails[0].value;
        const name = profile.displayName

        User.findOrCreate({ email: profile.emails[0].value}, function (err, user) {
            return done(err, user);
          });
        }
));
router.post('/google/token', passport.authenticate('google-token'),
    async function(req, res) {
    // res.send(req.user);
    const user = req.user
    const token = await user.getJwtToken()
    return res.status(200).json({token})
});

module.exports = router

