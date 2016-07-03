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
        name: { required: true, type: 'string' },
        title: {  required: true, type: 'string' },
        content: 'string',
        icon: 'string' // base64
      }, notification, (err) => {
        if (err) {
          this.logger.throw(err);
        }
        // Fire along
        this.io.emit('notification', notification);
      });
    }
  });

  api.run(
    (bedel) => {
      // TODO
      // Here is function
      // That is executed
      // It should function like a normal server
      // bedel = api object ('this')
      bedel.fireNotification({
        name: 'test',
        title: 'Test',
        content: 'Test',
        icon: 'base64'
      });
    }
  );

  api.sockets.start();
};
