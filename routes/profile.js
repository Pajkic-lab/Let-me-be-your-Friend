const express = require('express')
const router = express.Router()
const pool = require('../db')


router.post('/', async(req, res)=> {
    const {id, name, status, avatar} = req.body
    try {
        const newProfile = await pool.query(
            "INSERT INTO profiles (user_id, name, status, avatar) VALUES($1, $2, $3, $4) RETURNING *",
             [id, name, status, avatar]
             )
        const profile = {
            id: newProfile.rows[0].id,
            name: newProfile.rows[0].name,
            status: newProfile.rows[0].status,
            avatar: newProfile.rows[0].avatar,
        }
        console.log(profile)
        res.send(profile)
    } catch (err) {
        console.log(err)
    }
})

router.get('/', async(req, res)=>{
    try {
        //console.log(req.session.user)
        //if profile does not exist
        const id = req.session.user.id
        const newProfile = await pool.query("SELECT * FROM profiles WHERE user_id = $1", [id])
        const profile = {
            id: newProfile.rows[0].id,
            name: newProfile.rows[0].name,
            status: newProfile.rows[0].status,
            avatar: newProfile.rows[0].avatar
        }
        console.log(profile)
        res.send(profile)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router

//profiles
// user_id   name    status    avatar