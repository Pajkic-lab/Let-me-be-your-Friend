const express = require('express')
const router = express.Router()
const pool = require('../db')


router.post('/', async(req, res)=> {
    const foll = req.body.guestProfile_id
    const id = req.session.user.id
    try {
        await pool.query("INSERT INTO social (user_id, following) VALUES($1, $2) RETURNING *", [id, foll])
        res.send(true)
    } catch (err) {
        console.log(err)
    }
})

router.post('/get', async(req, res)=> {
    const foll = req.body.guestProfile_id
    const id = req.session.user.id
    try {
        const newFollower = await pool.query("SELECT * FROM social WHERE user_id = $1 AND following = $2", [id, foll])
        if(newFollower.rows.length > 0) {
            res.send(true)
        } else {
            res.send(false)
        }
    } catch (err) {
        console.log(err)
    }
})

router.delete('/', async(req, res)=> {
    const foll = req.body.guestProfile_id
    const id = req.session.user.id
    try {
        await pool.query("DELETE FROM social WHERE user_id = $1 AND following = $2", [id, foll]) 
        res.send(false)
    } catch (err) {
        console.log(err)
    }
})

router.get('/getnumber', async(req, res)=> {
    const id = req.session.user.id
    try {
        const newFollower = await pool.query("SELECT * FROM social WHERE user_id = $1", [id])
        const followingNumber = newFollower.rows.length
        const newFollowe = await pool.query("SELECT * FROM social WHERE following = $1", [id])
        const followersNumber = newFollowe.rows.length
        const data = {
            followingNumber,
            followersNumber
        }
        res.send(data)
    } catch (err) {
        console.log(err)
    }
})

router.post('/getguestnumber', async(req, res)=> {
    const id = req.body.guestProfile_id
    try {
        const newFollower = await pool.query("SELECT * FROM social WHERE user_id = $1", [id])
        const ContactfollowingNumber = newFollower.rows.length
        const newFollowe = await pool.query("SELECT * FROM social WHERE following = $1", [id])
        const ContactfollowersNumber = newFollowe.rows.length
        const data = {
            ContactfollowingNumber,
            ContactfollowersNumber
        }
        res.send(data)
    } catch (err) {
        console.log(err)
    }
})


module.exports = router