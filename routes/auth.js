const express = require('express')
const passport = require('passport')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const pool = require('../db')
const bcrypt = require("bcrypt")
const { session } = require('passport')



// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] })) 


// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback', 
  passport.authenticate('google', { failureRedirect: "http://localhost:3000" }),
  (req, res) => {
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
  check('email', 'email is required').isEmail(),
  check('password', 'password is required').isLength({min: 6})
], async(req, res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const {email, password} = await req.body
    try {
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email])
      const isMatch = await bcrypt.compare(password, user.rows[0].password)
         if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalide credentials'}]})
        }
        const sessionUser = {
          id: user.rows[0].id,
          name: user.rows[0].name,
          email: user.rows[0].email,
          googleId: user.rows[0].googleId,
          image: user.rows[0].image
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
/*
router.get('/', (req, res)=> {
  try {
    console.log(req.session.user)  
  } catch (err) {
    console.log(err)
  }
})*/

module.exports = router