const express = require('express')
const router = express.Router()
const pool = require('../db')


router.post('/', async(req, res)=> {
    const email = req.body.search
    console.log(req.session.user.id)
    console.log(email)
})


module.exports = router