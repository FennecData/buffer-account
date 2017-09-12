import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import {
  ConnectedRouter as Router,
} from 'react-router-redux';
import createStore, { history } from '@bufferapp/publish-store';
import App from './components/App';


const store = createStore();

store.dispatch({
  type: 'APP_INIT',
});

const renderApp = (AppComponent) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          <AppComponent />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const newApp = require('./components/App').default; // eslint-disable-line global-require
    renderApp(newApp);
  });
}
