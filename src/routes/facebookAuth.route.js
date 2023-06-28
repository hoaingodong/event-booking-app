require("dotenv").config()
const express = require("express")
const router = express.Router()
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const User = require("../models/user.model")
const userService = require("../services/user.service")

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    fbGraphVersion: 'v3.0'
  }, async function (accessToken, refreshToken, profile, done) {
            console.log(accessToken, refreshToken, profile, done)
    
            User.findOrCreate({facebookId: profile.id}, function (err, user) {
                console.log(user)
                return done(err, user);
              });
            }
));

router.post('/facebook/token', passport.authenticate('facebook-token'), 
   async function(req, res) {
    const user = req.user
    const token = await user.getJwtToken()
    return res.status(200).json({token, user})
});

module.exports = router

