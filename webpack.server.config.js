const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

let nodeModules = {};
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
        new ExtractTextPlugin({
            filename: '[name].styles.min.css'
        })
    ],
    module: {
        loaders: [
            {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader']},
            {test: /\.js$/, include: path.join(__dirname, 'tools'), loaders: ['babel-loader']},
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                importLoaders: 2,
                                sourceMaps: true
                            }
                        },
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            },
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
