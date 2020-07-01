const GoogleStrategy = require('passport-google-oauth20').Strategy
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
          console.log(profile)
          const newUser = await pool.query("SELECT * FROM users WHERE googleId = $1", [profile.id])
          if (newUser.rows.length > 0) {
            console.log(newUser)
            const user = {
            id: newUser.rows[0].id,
            name: newUser.rows[0].name,
            googleId: newUser.rows[0].googleId,
            image: newUser.rows[0].image
            }
            done(null, user)
          } else {
            const newUser = await pool.query("INSERT INTO users (name, googleId, image) VALUES($1, $2, $3) RETURNING *", [profile.displayName, profile.id, profile.photos[0].value])
            console.log(newUser)
            const user = {
              id: newUser.rows[0].id,
              name: newUser.rows[0].name,
              googleId: newUser.rows[0].googleId,
              image: newUser.rows[0].image
          }
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
    done(null, user.id)
  })

  passport.deserializeUser( async(id, done) => {
    const newUser = await pool.query("SELECT * FROM users WHERE id = $1", [id])
    const user = {
      id: newUser.rows[0].id,
      name: newUser.rows[0].name,
      googleId: newUser.rows[0].googleId,
      image: newUser.rows[0].image
  }
    done(null, user) 
  })
}

/*
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
    
  })
*/