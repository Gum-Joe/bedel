// Add api plugins
/**
 * Module depedencies
 */
const schema = require('../util/schema');

// ID for next task
let nextTaskId = 0;

/**
 * Add api stuff
 * @param api {Api} Api class
 */
module.exports = (api) => {
  api.addPlugin({

    /**
     * Sends a notification to the client
     * @param notification {Object} notification to send
     */
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
          socket.emit(
            'notification',
            notification
          );
        });
      });
    },

    /**
     * Creates a tasks and sends it to the client
     * @param task {Object} inital task state
     * @return Object
     */
    createTask: function (task) {
      const taskToSend = Object.assign({
        id: nextTaskId,
        status: "0%",
        percentage: 0
      }, task);

      schema({
        app: { required: true, type: 'string' },
        status: 'string',
        percentage: 'number'
      }, task, (err) => {
        if (err) {
          this.logger.throw_noexit(err);
        }
        // Emit
        api.sockets.use((socket) => {
          socket.emit(
            'task:new',
            taskToSend
          );
        });
      });
      // Increase next task id
      nextTaskId++;

      // Task actions
      return {
        task: taskToSend,

        /**
         * Updates the status of a task
         * @param newStatus {Object} new status of the task
         */
        update(newStatus = {}) {
          this.task = Object.assign(this.task, newStatus);
          api.sockets.use((socket) => {
            socket.emit(
              'task:update',
              this.task
            );
          });
        },

        /**
         * Ends a task
         * @param newStatus {Object} new status of the task
         */
        end(newStatus = {}) {
          this.task = Object.assign(
            this.task,
            { status: 'Done!' },
            newStatus,
            { percentage: '1' }
          );
          // Send
          api.sockets.use((socket) => {
            socket.emit(
              'task:end',
              this.task
            );
          });
        },

        /**
         * Sets what to do in the case of the user cancelling the task
         * @param cb {Function} what to do on canel
         */
        onCancel(cb) {
          const taskTmp = this.task;
          api.sockets.use((socket) => {
            socket.on(
              'task:cancel',
              (task) => {
                if (task === taskTmp) {
                  return cb(() => {
                    // Tell it to end
                    socket.emit('task:end', taskTmp);
                  });
                }
              }
            );
          });

        }
      };
    }
  });

  // For testing
  api.fireNotification({
    app: 'Test',
    body: Math.round(Math.random() * 100).toString(),
    icon: '/img/home-icon.png'
  });

  const task = api.createTask({
    app: 'Task',
    status: 'Doing some stuff...',
    percentage: '0'
  });
  task.update({
    percentage: '0.6'
  });

  // For testing. Remove for final copy
  api.app.get('/api/dev/fire/notification', (req, res) => {
    api.io.emit('notification', {
      app: 'Test',
      body: Math.round(Math.random() * 100).toString(),
      icon: '/img/home-icon.png'
    });
    res.status(200);
    res.send('done!').end();
  });

  api.sockets.start();
};
