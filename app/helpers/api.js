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
        body: { required: true, type: 'custom' },
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

  // For testing
  api.fireNotification({
    app: 'Test',
    body: 'test',
    icon: '/img/home-icon.png'
  });

  // For testing. Remove for final copy
  api.app.get('/api/testing/fire/notification', (req, res) => {
    api.io.emit('notification', {
      app: 'Test',
      body: 'test',
      icon: '/img/home-icon.png'
    });
    res.status(200);
    res.send('done!').end();
  });

  api.sockets.start();
};
