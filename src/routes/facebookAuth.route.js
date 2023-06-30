require("dotenv").config()
const express = require("express")
const router = express.Router()
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const User = require("../models/user.model")
const userService = require("../services/user.service")
const {celebrate, Segments} = require("celebrate");
const Joi = require("joi");

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new FacebookTokenStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        fbGraphVersion: 'v3.0'
    }, async function (accessToken, refreshToken, profile, done) {
        console.log(accessToken, refreshToken, profile, done)
        User.findOrCreate({facebookId: profile.id}, function (err, user) {
            user.name = profile.displayName
            user.avatar = {url: profile.photos[0].value}
            user.save()
            return done(err, user);
        });
    }
));

// router.post('/facebook/token', passport.authenticate('facebook-token'),
//     async function (req, res) {
//         const user = req.user
//         const token = await user.getJwtToken()
//         return res.status(200).json({token, user})
//     });

router.post('/facebook/token', celebrate({[Segments.BODY]: {access_token: Joi.string().required()}}),  passport.authenticate('facebook-token'),
    async (req, res) => {
        if (req.user) {
            const user = req.user
            const token = await user.getJwtToken()
            res.status(200).json({
                token: token,
                user: req.user
            })
        } else {
            res.status(401).json({
            })
        }
    },
    (error, req, res, next) => {
        if(error) {
            res.status(401).json({error: "Unauthorizer"})
        }
    }
);

module.exports = router

