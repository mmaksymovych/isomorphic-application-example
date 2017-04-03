var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};

fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './tools/prodServer.js',
    target: 'node',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js'
    },
    externals: {
        nodeModules
    },
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                ascii_only: true,
                comments: false
            }
        })
    ],
    module: {
        loaders: [
            {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader']},
            {test: /\.js$/, include: path.join(__dirname, 'tools'), loaders: ['babel-loader']},
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.es6', '.scss', '.css', '.png'],
        modules: [
            path.resolve(__dirname, './src/js'),
            'node_modules'
        ],
        mainFiles: ["index"]
    }
};
