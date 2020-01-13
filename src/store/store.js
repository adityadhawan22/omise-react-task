/**
 * This file creates/initializes the redux store using all the middlewares.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { routerMiddleware } from 'connected-react-router'

// This will also be used for SSR in react-renderer.js
export let history;

/**
 *
 * @param {object} initialState Initial state passed from the server side rendered app.
 * @param {string} url Passed from only the server side call to configure store. It contains the request url.
 * @returns {object} store The redux store created with all the middlewares (saga, router and devtools).
 */
const configureStore = ( initialState, url = '/' ) => {
  let store;

  // If server side history should be created using createMemoryHistory else createBrowserHistory.
  if ( process.env.EXPRESS ) {
    history = createMemoryHistory( {
      initialEntries: [ url ],
    } )
  } else
    history = createBrowserHistory();

  // Enhancers are the dev tools extensions like redux extension in this case.
  const enhancers = [];

  // Should only be assigned when the store is re-initialized on the client side.
  if ( !process.env.EXPRESS ) {
    enhancers.push( window.__REDUX_DEVTOOLS_EXTENSION__ && // eslint-disable-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line no-underscore-dangle
    );
  }

  if ( process.env.NODE_ENV === 'development' ) {
    store = createStore(
      rootReducer( history ),
      initialState,
      compose(
        applyMiddleware(
          routerMiddleware(history),
          thunk,
        ),
      )
    );
  } else {
    store = createStore(
      rootReducer( history ),
      initialState,
      compose(
        applyMiddleware(
          routerMiddleware( history ),
          thunk,
        ),
      )
    );
  }

  return store;
}

export default configureStore;