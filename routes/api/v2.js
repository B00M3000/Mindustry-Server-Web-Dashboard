const express = require('express')
var router = express.Router()

router.use((req, res, next) => {
  const token = req.headers["authorization"]

  if(typeof token === undefined){
    return res.sendStatus(401)
  } else {
    const address = require('../../tokens.json')[token]

    if(!address) return res.sendStatus(401)

    req.address = address

    next()
  }
})

router.post('/', (req, res) => {
  const { request_type, data } = req.body
  const { address } = req

  
})

router.post('/newChatMessage')

module.exports = router