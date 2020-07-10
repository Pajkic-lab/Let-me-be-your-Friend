const express = require('express')
const router = express.Router()
const pool = require('../db')


router.post('/', async(req, res)=> {
    const {email, name, status, avatar} = req.body
    const id = req.session.user.id
    try {
        const newProfile = await pool.query(
            "INSERT INTO profiles (user_id, name, status, avatar, email) VALUES($1, $2, $3, $4, $5) RETURNING *",
             [id, name, status, avatar, email]
             )
        const profile = {
            id: newProfile.rows[0].id,
            name: newProfile.rows[0].name,
            status: newProfile.rows[0].status,
            avatar: newProfile.rows[0].avatar,
        }
        res.send(profile)
    } catch (err) {
        console.log(err)
    }
})

router.get('/', async(req, res)=>{
        const id = req.session.user.id
    try {
        const newProfile = await pool.query("SELECT * FROM profiles WHERE user_id = $1", [id])
        if(newProfile.rows.length < 1) {
            return res.status(400).json({ error: 'profile does not exist' })
        }
        const profile = {
            id: newProfile.rows[0].id,
            name: newProfile.rows[0].name,
            status: newProfile.rows[0].status,
            avatar: newProfile.rows[0].avatar
        }
        res.send(profile)
    } catch (err) {
        console.log(err)
    }
})

router.put('/', async(req, res)=> {
    const id = req.session.user.id
    const {name, status, avatar} = req.body
    try {
        const updateProfile = await pool.query("UPDATE profiles SET name=$2, status=$3, avatar=$4 WHERE user_id = $1 RETURNING *", [id, name, status, avatar])
        const profile = {
            id: updateProfile.rows[0].id,
            name: updateProfile.rows[0].name,
            status: updateProfile.rows[0].status,
            avatar: updateProfile.rows[0].avatar
        } 
        res.send(profile) 
    } catch (err) {
        console.log(err)
    }
})

router.post('/contact', async(req, res)=> {
    const guestProfile_id = req.body.guestProfile_id
    const profile = await pool.query("SELECT * FROM profiles WHERE user_id = $1", [guestProfile_id])
    const guestProfile = {
        id: profile.rows[0].id,
        user_id: profile.rows[0].user_id,
        name: profile.rows[0].name,
        status: profile.rows[0].status,
        avatar: profile.rows[0].avatar,
        email: profile.rows[0].email
    }
    res.send(guestProfile)
})

module.exports = router

