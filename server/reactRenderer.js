import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import routes from '../src/routes';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { ServerStyleSheet } from 'styled-components'
// import reducers from '../src/reducers/rootReducer';
import configureStore from '../src/store/store';

const fs = require( 'fs' );
const path = require('path');
const PUBLIC_DIR = path.join( __dirname, '..', 'public' );
const BUILD_DIR = path.join( __dirname, '..', 'build' );


let indexFile = null; 
indexFile = fs.readFileSync( path.join( BUILD_DIR, 'index.html' ), 'utf8' );


function reactRenderer(req, res, next) {
    let store;
    try{
        store = configureStore({}, req.url);
    }
    catch(err){}
    const sheet = new ServerStyleSheet();
    let html = indexFile;
    let context = {};
    const branch = matchRoutes(routes, req.url);
    const promises = branch.map(({ route }) => {
        let fetchData = route.component.fetchData;
        return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null)
    });
    Promise.all(promises)
        .then((data) => {
            const content = renderToString(sheet.collectStyles(
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        {renderRoutes(routes)}
                    </StaticRouter>
                </Provider>
            ));

            console.log(store.getState() )
            const styleTags = sheet.getStyleTags();
            html = html.replace( '<style id="styled-component-css"></style>', styleTags );
            html = html.replace( '<div id="root"></div>', '<div id="root">' + content + '</div>' );
            html = html.replace( '<script>window.INITIAL_STATE={}</script>', `<script>window.INITIAL_STATE=${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}</script>` )
            res.send(html);
        })



}
module.exports = reactRenderer;