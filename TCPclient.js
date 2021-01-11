const net = require('net')

class MindustryServerTCPClient {
  constructor(url, port) {
    this.url = url
    this.port = port
    
    this.client = new net.Socket()
  }
  connect(callback){
    this.client.connect(this.port, this.url, () => {
      callback()
    })
  }
  destroy(callback){
    this.client.destroy()
    callback()
  }
}