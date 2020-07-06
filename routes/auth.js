const express = require('express')
const passport = require('passport')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const pool = require('../db')
const bcrypt = require("bcrypt")
const { session } = require('passport')
//url from G credentials
//http://localhost:5000/auth/google/callback



// @desc    Auth with Google
// @route   GET /auth/google
//http://localhost:5000/auth/google
//https://probamoheroku2.herokuapp.com/auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] })) 


// @desc    Google auth callback
// @route   GET /auth/google/callback
//http://localhost:5000/auth/google/callback
//http://probamoheroku2.herokuapp.com/auth/google/callback
router.get(
  '/google/callback', 
  passport.authenticate('google', { failureRedirect: "https://probamoheroku2.herokuapp.com" }), //http://localhost:3000
  (req, res) => {
    //console.log(req.user)
    req.session.user = req.user
    //http://localhost:3000/dashboard
    //https://probamoheroku2.herokuapp.com/dashboard
    res.redirect("http://localhost:3000/dashboard")
  }
)

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
  req.logout()   // logout comes from req object... probably set there by google
  res.redirect('/')
})


router.post('/', [
  check('email', 'precise email adres is required').isEmail(),
  check('password', 'password has to be 6 characters long').isLength({min: 6})
], async(req, res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({ error: errors.errors[0].msg })
    }
    const {email, password} = await req.body
    try {
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        if(user.rows.length < 1) {
            return res.status(400).json({ error: 'Invalide credentials' })
        }
      const isMatch = await bcrypt.compare(password, user.rows[0].password)
         if(isMatch !== true) {
            return res.status(400).json({ error: 'Invalide credentials' })
        }
        const sessionUser = {
          id: user.rows[0].id,
          name: user.rows[0].name,
          email: user.rows[0].email
      }
        req.session.user = sessionUser
        res.send(sessionUser)
    } catch (err) {
      console.log(err)
    }
})

router.delete('/', (req, res)=> {
  try {
    const user = req.session.user
    if(user) {
      req.session.destroy(err=> {
        if(err) throw (err)
        res.clearCookie('SESS_NAME')
        res.send(user)
      })
    } else {
      throw new Error('Somthing went wrong!!!')      
    }
  } catch (err) {
    console.log(err) 
  }
})


module.exports = router