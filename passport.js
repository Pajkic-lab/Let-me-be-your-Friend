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
        try {
          const newUser = await pool.query("SELECT * FROM users WHERE googleId = $1", [profile.id]) 
          if (newUser.rows.length > 0) {
            //console.log(newUser.rows)
            const user = {
            id: newUser.rows[0].id,
            name: newUser.rows[0].name,
            email: newUser.rows[0].email,
            googleId: newUser.rows[0].googleid,
            image: newUser.rows[0].image,
            nesto: 'PA NESTO'
            }
            done(null, user)
          } else {
            /*const newUser = {
              googleId: profile.id,
              name: profile.displayName,
              email: profile._json.email,
              image: profile.photos[0].value,
            }*/
            const newUser = await pool.query("INSERT INTO users (name, googleId, image, email) VALUES($1, $2, $3, $4) RETURNING *", [profile.displayName, profile.id, profile.photos[0].value, profile._json.email])
            console.log(newUser.rows[0])
            const user = {
              id: newUser.rows[0].id,
              name: newUser.rows[0].name,
              email: newUser.rows[0].email,
              googleId: newUser.rows[0].googleid,
              image: newUser.rows[0].image
            }
            done(null, user) 
          }
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
      email: newUser.rows[0].email,
      googleId: newUser.rows[0].googleId,
      image: newUser.rows[0].image
  }
  //console.log(user)
    done(null, user) 
  })
}

/*
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
    
  })
*/