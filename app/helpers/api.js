// Add api plugins
/**
 * Module depedencies
 */
const schema = require('../util/schema');

/**
 * Add api stuff
 * @param api {Api} Api class
 */
module.exports = (api) => {
  api.addPlugin({
    fireNotification: function (notification) {
      // Validate
      schema({
        app: { required: true, type: 'string' },
        body: { required: true, type: 'string' },
        icon: 'string' // base64
      }, notification, (err) => {
        if (err) {
          this.logger.throw_noexit(err);
        }
        // Fire along
        api.sockets.use((socket) => {
          socket.emit('notification', notification);
        });
      });
    }
  });

  api.fireNotification({
    app: 'Test',
    body: 'test',
    icon: '/img/home-icon.png'
  });

  api.sockets.start();
};
