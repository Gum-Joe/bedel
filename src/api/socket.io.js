'use strict';
// Socket.io file
/**
 * Module depedencies
*/
import io from 'socket.io';

// IO method
module.exports = {
  // Array of connections + methods
  events: [
    // Example:
    // { event: test, listener: (data, socket) => console.log('hi!') }
  ],
  /**
   * Start a socket.io server
   * @param server {Server} - Http/Https server class
   */
  init(server, logger) {
    // Start io
    this.io = io(server);
    this.logger = logger;
    return this.sockets;
  },

  /**
   * Default listener
   */
  defaultListener(socket) {
    this.logger.debug('A client has connected to the socket.io server');
    // Add Listeners
    let listener;
    for (listener of this.events) {
      socket.on(listener.event, listener.listener(socket, this.logger));
    }
  },

  /**
   * Add the listener for the 'connection' event
   */
  start() {
    this.logger.debug('Adding listener for socket.io connection event...');
    this.io.on('connection', this.defaultListener.bind(this));
  },

  /**
   * Use a specific listener for a certain event
   * @param event {String} - Event to listen on
   * @param listener {Function} - Listener
   */
  use(event, listener) {
    this.events.push({
      event: event,
      listener: listener.bind(this)
    });
  }
};
