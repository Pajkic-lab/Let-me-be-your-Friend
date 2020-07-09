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

module.exports = router

//profiles
// user_id   name    status    avatar
/*
const updateTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
      [description, id, req.user.id]
    ); 
*/