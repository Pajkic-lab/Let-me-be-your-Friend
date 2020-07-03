const express = require('express')
const router = express.Router()

router.get('/', (req, res)=> {
    try {
      //console.log(req.session.user)  
      if(req.session.user) {
        const user = req.session.user
        res.send(user)
      }
    } catch (err) {
      console.log(err)
    }
  })

  module.exports = router