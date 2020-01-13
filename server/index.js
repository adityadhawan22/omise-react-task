
let babelPlugins = ['@babel/plugin-proposal-class-properties'];
require( '@babel/register' )( {
    ignore: [ /\/(build|node_modules)\// ],
    presets: [ '@babel/preset-env', '@babel/preset-react' ],
    plugins: [ ...babelPlugins ],
  } );
require( '@babel/polyfill' );
require('./server');

// npm install --save-dev @babel/polyfill @babel/preset-react @babel/preset-env @babel/register
