// require("dotenv").config()
// const passport = require('passport');
// const GoogleTokenStrategy = require('passport-google-token').Strategy;
// const User = require("../models/user.model")
// const userService = require("../services/user.service")
//
// passport.use(new GoogleTokenStrategy({
//         clientID: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//     },
//     async function (accessToken, refreshToken, profile, done) {
//         console.log(accessToken, refreshToken, profile, done)
//
//         const email = profile.emails[0].value;
//         const name = profile.name.familyName + " " + profile.name.givenName;
//
//         const currentUser = await User.find({email: email})
//         console.log(currentUser)
//         if (currentUser == []) {
//             await userService.createNew({email, name})
//         }
//     }
// ));
//
// module.exports('passport')