const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const pool = require('../db')
const bcrypt = require("bcrypt")


router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').isLength({min: 6})
], 
async(req, res)=> {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {name, email, password} = await req.body
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        if(user.rows.length > 0) {
            return res.status(400).json('USER ALREDY EXISTS')
        }
        const salt = await bcrypt.genSalt(10)
        const bcryptPassword = await bcrypt.hash(password, salt)
        const newUser = await pool.query("INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *", [name, email, bcryptPassword])
        const sessionUser = {
            id: newUser.rows[0].id,
            name: newUser.rows[0].name,
            email: newUser.rows[0].email
            //googleId: newUser.rows[0].googleId,
            //image: newUser.rows[0].image
        }
        req.session.user = sessionUser
        res.send(sessionUser) 
    } catch (err) {
       console.error(err.message)
       res.status(500).send('Server error')
    } 
})


module.exports = router