/**
 * This file contains all the routes to be handled within the app on both the server and the client sides.
 */

import App from './App';
import Home from './containers/Home/Home'; 
import Charity from './containers/Charity/Charity'; 

const routes = [
  {
    path: '/',
    component: App,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
      },
      {
        path: '/charity/:id',
        component: Charity, 
        exact: true,
      }
    ],
  }
];

export default routes;