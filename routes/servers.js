const express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
  res.send('Page is still under construction')
})

router.get('/:address', (req, res) => {
  const { address } = req.params
  res.render('server', {
    address: req.params.address
  })
})

module.exports = router