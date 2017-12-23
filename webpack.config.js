'use strict';

const HtmlWebpack = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ChunkWebpack = webpack.optimize.CommonsChunkPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootDir = path.resolve(__dirname, '..');
module.exports = {
    devServer: {
        contentBase: path.resolve(rootDir, 'dist'),
        port: 3000
    },
    devtool: 'source-map',
    entry: {
        app: './src/main.ts'
    },
    module: {
        loaders: [
            { 
                test: /\.css$/,
                loader: 'raw-loader'
            },
            { 
                test: /\.htm$/,
                loader: 'html-loader'
            },
            { 
                test: /\.scss$/,
                loader: ['to-string-loader','style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.ts$/,
                loader: ['ts-loader', 'angular2-template-loader'],
                exclude: /node_modules/
             },
            { 
                test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,    
                loader: 'file-loader'
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(rootDir, 'dist')
    },
    plugins: [
        new HtmlWebpack({
            filename: 'index.html',
            inject: 'body',
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin([
            { from: 'src/jsassets', to: 'assets' },
            { from: 'src/fonts', to: 'fonts/webfonts' }
        ])
    ],
    resolve: {
        extensions: ['.ts', '.js', '.json']
    }
};