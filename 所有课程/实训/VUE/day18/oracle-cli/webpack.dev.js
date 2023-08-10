const {merge} = require('webpack-merge');
const base = require('./webpack.base.js')
const path = require('path')

module.exports = merge(base, {
    devtool:'inline-source-map',//内联配置源码映射
    mode: 'development',
    devServer: {
        static: [path.resolve(__dirname, 'dist'), path.resolve(__dirname, 'public')],
        host: 'localhost',
        port: 8080,
        open: true,
        // openPage: ''
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'},
                {loader: 'postcss-loader'},
            ]
        }, {
            test: /\.scss$/,
            use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'},
                {loader: 'postcss-loader'},
                {loader: 'sass-loader'}
            ]
        }]
    }
})