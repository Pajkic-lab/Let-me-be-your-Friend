const express = require('express')
const router = express.Router()
const pool = require('../db')


router.post('/', async(req, res)=> {
    const foll = req.body.guestProfile_id
    const id = req.session.user.id
    try {
        const newFollower = await pool.query("INSERT INTO social (user_id, following) VALUES($1, $2) RETURNING *", [id, foll])
        const social = {
            user_id: newFollower.rows[0].user_id,
            following: newFollower.rows[0].following
        }
        console.log(social)
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
        console.log(newFollower.rows[0])
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
        const newFollower = await pool.query("DELETE FROM social WHERE user_id = $1 AND following = $2", [id, foll]) 
        console.log(newFollower)
        res.send(false)
    } catch (err) {
        console.log(err)
    }
})


module.exports = router


//id       user(id)             following(user_id)
//1           sam@                srbijav93@