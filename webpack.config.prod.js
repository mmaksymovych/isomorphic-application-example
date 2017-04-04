import webpack from 'webpack';
import path from 'path';
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
    devtool: 'source-map',
    entry: [
        path.resolve(__dirname, 'src/index')
    ],
    target: 'web',
    output: {
        path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin(GLOBALS),
        new ExtractTextPlugin({
            filename: '[name].styles.min.css'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
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
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: 'eslint-loader'
            },
            {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader']},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
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
