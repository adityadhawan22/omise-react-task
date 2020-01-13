import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import home from './home';
import charity from './charity';

const rootReducer = ( history ) => combineReducers( {
  home,
  charity,
  router: connectRouter( history ),
} );

export default rootReducer;