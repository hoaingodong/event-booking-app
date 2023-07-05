require("dotenv").config()
const express = require("express")
const router = express.Router()
const passport = require("passport")
const GoogleTokenStrategy = require("passport-google-token").Strategy
const {celebrate, Segments} = require("celebrate")
const Joi = require("joi")
const User = require("../models/user.model")

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})

passport.use(
    new GoogleTokenStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        },
        async function (accessToken, refreshToken, profile, done) {
            console.log(accessToken, refreshToken, profile, done)

            User.findOrCreate(
                {email: profile.emails[0].value},
                function (err, user) {
                    if (!user.name) {
                        user.name = profile.displayName
                    }
                    if (!user.avatar) {
                        user.avatar = {url: profile._json.picture}
                    }
                    user.verified = true
                    user.save()
                    return done(err, user)
                }
            )
        }
    )
)

router.post('/google/token', celebrate({
    [Segments.BODY]: {
        access_token: Joi.string().required(),
        tokenDevice: Joi.string()
    }
}), (req, res) => {
    passport.authenticate('google-token', async (err, user, info) => {
        if (err) {
            return res.status(500).send()
        }
        if (!user && info) {
            return res.status(401).json({error: "Unauthorized"})
        }

        const token = await user.getJwtToken()
        user.tokenDevice = req.body.tokenDevice
        return res.status(200).json({token, user})
    })(req, res)
})

module.exports = router
