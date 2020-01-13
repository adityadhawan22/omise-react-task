import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import route from './routes';
import { Provider } from 'react-redux';
import configureStore, { history } from './store/store';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import styles from './helpers/styles';

const reduxStore = configureStore(window.INITIAL_STATE);
delete window.INITIAL_STATE;

const app = (
  <Provider store={reduxStore}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={styles}>
        <HelmetProvider>
          <Router basename="/">
            {renderRoutes(route)}
          </Router>
        </HelmetProvider>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.hydrate(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
