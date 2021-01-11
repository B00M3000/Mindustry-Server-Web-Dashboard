const express = require('express')
var router = express.Router()

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]

  if(typeof token === undefined){
    return res.sendStatus(401)
  } else {
    const address = require('../../tokens.json')[token]

    if(!address) return res.sendStatus(401)

    req.address = address

    next()
  }
}

router.post('/', verifyToken, (req, res) => {
  const { request_type, data } = req.body
  const { address } = req

  res.cache[address] = res.cache[address] || {}
  
  if(request_type == 'new-chat-message'){
    res.socket_io.sockets.emit(`new-chat-message:${address}`, data)
  }

  if(request_type == 'map-update'){
    res.cache[address].map = data
    res.socket_io.sockets.emit(`map-update:${address}`, data)
  }

  if(request_type == 'player-list-update'){
    res.cache[address].players = data
    res.socket_io.sockets.emit(`player-list-update:${address}`, data)
  }

  if(request_type == 'name-update'){
    res.cache[address].name = data
    res.socket_io.sockets.emit(`name-update:${address}`, data)
  }

  res.sendStatus(200) // OK
})

module.exports = router