const express = require('express')
const router = express.Router()
const pool = require('../db')


router.post('/', async(req, res)=> {
    const id = req.session.user.id
    const { text, image } = req.body
    try {
        const newPost = await pool.query("INSERT INTO posts (user_id, text, image) VALUES($1, $2, $3) RETURNING *", [id, text, image])
        const post = {
            id: newPost.rows[0].id,
            user_id: newPost.rows[0].user_id,
            text: newPost.rows[0].text,
            image: newPost.rows[0].image,
            created_at: newPost.rows[0].created_at
        }
        res.send(post)
    } catch (err) {
        console.log(err)
    }
})

router.get('/', async(req, res)=> {
    const id = req.session.user.id
    try {
        const newFollowers = await pool.query("SELECT following FROM social WHERE user_id = $1", [id])
        let follo = newFollowers.rows.map(fol=> fol.following)
        follo.push(id)
        // za svaki follo vrati i profil
        //const profile = await pool.query("SELECT * FROM profiles WHERE user_id = ANY($1::int[])",[follo])

        const contactPosts = await pool.query(
            'SELECT * FROM posts WHERE user_id = ANY($1::int[]) ORDER BY created_at DESC',[follo]) //ORDER BY created_at ASC/DESC
        console.log(contactPosts.rows)
        const posts = contactPosts.rows

        //
        const user_id = contactPosts.rows.map(uid => uid.user_id)
        const NewProfile = await pool.query("SELECT * FROM profiles WHERE user_id = ANY($1::int[])",[user_id]) 
        //console.log(NewProfile.rows)
        const profile = NewProfile.rows

        //

        res.send(posts)
    } catch (err) {
        console.log(err)
    }
})

router.post('/del', async(req, res)=> {
    const { id } = req.body
    try {
        await pool.query("DELETE FROM posts WHERE id = $1", [id])
        res.send({id})  
    } catch (err) {
        console.log(err)
    }
})

module.exports = router