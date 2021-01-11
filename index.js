const http = require('http')
const express = require('express');
const socketio = require('socket.io')

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000

const servers = require('./routes/servers')
const api = require('./routes/api')

const app = express();
const server = http.Server(app)
const io = socketio(server)

const cache = {}

app.use(bodyParser.json());
app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static(__dirname + '/static'));
app.use(cookieParser());

app.use((req, res, next) => {
  res.socket_io = io
  res.cache = cache
  next()
})

io.on('connection', socket => {
  socket.on('ready', address => {
    if(!cache[address]) return
    if(cache[address].map){
      socket.emit(`map-update:${address}`, {
        name: cache[address].map.name || "Unknown",
        author: cache[address].map.author || "Unknown"
      })
    }
    if(cache[address].players){
      socket.emit(`player-list-update:${address}`, cache[address].players || [])
    }
    socket.emit(`name-update:${address}`, cache[address].name || "Unknown")
  })
})

app.get('/', (req, res) => {
  res.send('Page is still under construction')
})

app.use('/servers', servers)
app.use('/api', api)

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})