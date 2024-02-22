const plugins = [
    // transforms static class properties as well as properties declared
    // with the property initializer syntax
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-property-in-object'
    // ERROR in ./server/index.js
    // Module build failed (from ./node_modules/babel-loader/lib/index.js):
    // Error: Cannot find module 'babel/plugin-proposal-class-properties' from 
];