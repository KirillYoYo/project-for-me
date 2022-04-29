const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = path.resolve(__dirname, '..')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(ROOT, 'dist'),
    },

    plugins: ([
        new HtmlWebpackPlugin({
            title: 'web app here',
            scriptLoading: 'defer'
        })
    ]),
};