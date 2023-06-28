require("dotenv").config()
const express = require("express")
const router = express.Router()
const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const User = require("../models/user.model")
const userService = require("../services/user.service")

passport.use(new GoogleTokenStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    },
    async function (accessToken, refreshToken, profile, done) {
        console.log(accessToken, refreshToken, profile, done)

        const email = profile.emails[0].value;
        const name = profile.name.familyName + " " + profile.name.givenName;

        const currentUser = await User.find({email: email})
        console.log(currentUser)
        await userService.createNew({email, name})
    }
));
router.post('/google/token', passport.authenticate('google-token'),
    function(req, res) {
        res.send(req.user);
    });

module.exports = router

