const express = require('express')
const app = express()
const cors = require("cors")
const pool = require('./db')
const path = require('path')
const PORT = process.env.PORT || 5000
require('dotenv').config()  
const session = require("express-session")
const pgSession = require('connect-pg-simple')(session)

const passport = require('passport')
require('./passport')(passport)



app.use(cors())
app.use(express.json({ extended: false }))
app.use(session({
  name: 'SESS_NAME',
  store: new pgSession({
    pool : pool,                 
    tableName : 'session'
  }),
  secret: process.env.FOO_COOKIE_SECRET,
  saveUninitialized: false,
  resave: false,
  sameSite: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }  
}))
app.use(passport.initialize())
app.use(passport.session())



if(process.env.NODE_ENV === "production") {
    app.use("/", express.static("./client/build"))
  }


  //Routes
  app.use('/auth', require('./routes/auth'))
  app.use('/user', require('./routes/user'))
  app.use('/getuser', require('./routes/getuser'))
  app.use('/profile', require('./routes/profile'))
  app.use('/search', require('./routes/search'))


  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))  
  })


  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})