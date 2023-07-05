require("dotenv").config()
const express = require("express")
const router = express.Router()
const passport = require('passport')
const FacebookTokenStrategy = require('passport-facebook-token')
const {celebrate, Segments} = require("celebrate")
const Joi = require("joi")
const User = require("../models/user.model")

passport.serializeUser(function (user, done) {
    done(null, user)
});

passport.deserializeUser(function (user, done) {
    done(null, user)
});

passport.use(new FacebookTokenStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        fbGraphVersion: 'v3.0'
    }, async function (accessToken, refreshToken, profile, done) {
        console.log(accessToken, refreshToken, profile, done)
        User.findOrCreate({facebookId: profile.id}, function (err, user) {
            if (!user.name) {
                user.name = profile.displayName
            }
            if (!user.avatar) {
                user.avatar = {url: profile.photos[0].value}
            }
            user.verified = true
            return done(err, user)
        })
    }
))

router.post('/facebook/token', celebrate({
        [Segments.BODY]: {
            access_token: Joi.string().required(),
            tokenDevice: Joi.string()
        }
    }), passport.authenticate('facebook-token'),
    async (req, res) => {
        if (req.user) {
            const user = req.user
            const token = await user.getJwtToken()
            req.user.tokenDevice = req.body.tokenDevice
            req.user.save()
            res.status(200).json({
                token: token,
                user: req.user
            })
        } else {
            res.status(401).json({})
        }
    },
    (error, req, res, next) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"})
        }
    }
)

module.exports = router

