require("dotenv").config()
const express = require("express")
const router = express.Router()
const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const User = require("../models/user.model")

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

        User.findOrCreate({ email: profile.emails[0].value}, function (err, user) {
            user.name = profile.displayName
            user.avatar = {url: profile._json.picture}
            user.verified = true
            user.save()
            return done(err, user);
          });
        }
)
);
router.post('/google/token', function(req, res, next) { passport.authenticate('google-token'),
    async function(req, res) {
    const user = req.user
    const token = await user.getJwtToken()
    return res.status(200).json({token, user})
}}
);

// router.post('/google/token',  passport.authenticate('google-token'),
//     async (req, res) => {
//         if (req.user.err) {
//             res.status(401).json({
//                 success: false,
//                 message: 'Auth failed',
//                 error: req.user.err
//             })
//         } else if (req.user) {
//             const user = req.user
//             const token = await user.getJwtToken()
//             // return res.status(200).json({token, user})
//             res.status(200).json({
//                 success: true,
//                 message: 'Enjoy your token!',
//                 token: token,
//                 user: req.user
//             })
//         } else {
//             res.status(401).json({
//                 success: false,
//                 message: 'Auth failed'
//             })
//         }
//     },
//     (error, req, res, next) => {
//         if(error) {
//             res.status(400).json({success: false, message: 'Auth failed', error})
//         }
//     }
// );


module.exports = router

