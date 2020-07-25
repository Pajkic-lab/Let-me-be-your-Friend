const express = require('express')
const router = express.Router()
const pool = require('../db')


router.post('/', async(req, res)=> {
    const {comment, post_id} = req.body
    const id = req.session.user.id
    try {
        const newComments = await pool.query(
        "INSERT INTO comments (user_id, post_id, comment) VALUES($1, $2, $3) RETURNING *", [id, post_id, comment])
        const coment = newComments.rows
        res.send(coment)
    } catch (err) {
        console.log(err)
    }
})

router.post('/get', async(req, res)=> {
    const {post_id} = req.body
    const id = req.session.user.id
    try {
        const newComent = await pool.query('SELECT * FROM comments WHERE post_id = $1', [post_id]) 
        const comments = newComent.rows

        let users = comments.map(user=> user.user_id)
        users.push(id)
        const arr1 = [...new Set(users)]
        const NewProfiles = await pool.query("SELECT * FROM profiles WHERE user_id = ANY($1::int[])",[arr1]) 
        const profiles = NewProfiles.rows

        res.send({comments, profiles})  
    } catch (err) {
        console.log(err)
    }
})
   

module.exports = router

// id    user_id    post_id     comment