const GoogleStrategy = require('passport-google-oauth20').Strategy
//const mongoose = require('mongoose')
//const User = require('../models/User')
const pool = require('./db')


module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        /*const newUser = {
          googleId: profile.id,
          name: profile.displayName,
          image: profile.photos[0].value
        }*/
        try {
          //let user = await User.findOne({ googleId: profile.id })
          const newUser = await pool.query("SELECT * FROM users WHERE googleId = $1", [profile.id])
          const user = {
            id: newUser.rows[0].id,
            name: newUser.rows[0].name,
            email: newUser.rows[0].email,
            googleId: newUser.rows[0].googleId,
            image: newUser.rows[0].image
        }
          if (newUser) {
            done(null, user)
          } else {
            //user = await User.create(newUser)
            const user = await pool.query("INSERT INTO users (name, googleId, image) VALUES($1, $2, $3) RETURNING *", [profile.displayName, profile.id, profile.photos[0].value])
            done(null, user)
          } 
          console.log(user) 
        } catch (err) {
          console.error(err)
        }
      }
    )
  )
 
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((id, done) => {
    done(null, user)
  })
}