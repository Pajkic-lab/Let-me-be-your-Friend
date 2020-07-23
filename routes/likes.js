const express = require('express')
const router = express.Router()
const pool = require('../db')



router.post('/', async(req, res)=> {
    const user_id = req.session.user.id
    const {post_id} = req.body
    //const like = true
    try {
        const newLike = await pool.query(   //sredi bazu
            "INSERT INTO likes (user_id, post_id) VALUES($1, $2) RETURNING *", [user_id, post_id])
        console.log(newLike.rows)
        const like = newLike.rows
        res.send(like)
    } catch (err) {
        console.log(err)  
    }
})

router.post('/getall', async(req, res)=> {
    const {posts_ids} = req.body
    console.log(posts_ids)
    try {
        const newLikes = await pool.query(
            "SELECT * FROM likes WHERE post_id = ANY($1::int[])", [posts_ids])
        //console.log(newLikes.rows)
    } catch (err) {
        console.log(err)
    }
})

router.post('/getlike', async(req, res)=> {
    const {id} = req.body
    console.log(id)
    try {
        const newLike = await pool.query("SELECT * FROM likes WHERE post_id = $1", [id])
        const like = newLike.rows
        console.log(like)
        if(like>1){
            res.send(like)
        }else{
            res.send(like)
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router

//     id    user_id    post_id    like