import reactRenderer from './reactRenderer';
const path = require('path');
const express = require('express');
const app = express();
// const reactRenderer = require('./reactRenderer');

const BUILD_DIR = path.join( __dirname, '..', 'build' );
const PUBLIC_DIR = path.join( __dirname, '..', 'public' );

app.use( "/static", express.static( BUILD_DIR + "/static" ) );
app.use( "/assets", express.static( BUILD_DIR + "/assets" ) );

app.get('*', reactRenderer);

app.listen(3200, () => console.log(`Example app listening on port ${3200}!`))