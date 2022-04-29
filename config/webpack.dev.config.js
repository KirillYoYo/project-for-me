const path = require('path');
const commonConfig = require('./webpack.common.config')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

const ROOT = path.resolve(__dirname, '..')

module.exports = merge(commonConfig, {
    plugins: ([
        new HtmlWebpackPlugin({
            title: 'web app here',
            scriptLoading: 'defer'
        })
    ]),

    devServer: {
        static: {
            directory: path.join(ROOT, 'dist'),
        },
        compress: true,
        port: 3000,
    },
})