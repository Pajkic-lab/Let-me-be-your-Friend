const express = require('express')
const router = express.Router()
const pool = require('../db')


router.post('/', async(req, res)=> {
    const search = req.body.search
    const id = req.session.user.id
    const newProfile = await pool.query("SELECT * FROM profiles WHERE name LIKE $1 OR email LIKE $2", [`%${search}%`, `%${search}%`]) 
    const searchResult = newProfile.rows.filter(profile => profile.user_id !== id)
    res.send(searchResult)
})


module.exports = router

