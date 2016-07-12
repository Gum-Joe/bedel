// Configures the store
import { createStore } from 'redux';
import reducers from '../reducers';

export default function configureStore(initalState) {
  const store = createStore(reducers, initalState,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  // From https://github.com/zalmoxisus/redux-devtools-extension/blob/master/examples/counter/store/configureStore.js
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      /* eslint global-require: 0*/
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
