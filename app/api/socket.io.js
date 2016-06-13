// Socket.io file
/**
 * Module depedencies
*/
const io = require('socket.io');

// IO method
module.exports = {
  /**
   * Start a socket.io server
   * @param server {Server} - Http/Https server class
   */
  init(server) {
    // Start io
    this.io = io(server);
    return this.sockets;
  },

  /**
   * Add a socket.io listenner on connection
   * @param listener {Function} - Listenner function
   */
  addListenner() {
    return;
  }
};
