const path = require('path');
const commonConfig = require('./webpack.common.config')
const { merge } = require('webpack-merge');

const ROOT = path.resolve(__dirname, '..')

module.exports = merge(commonConfig, {
    devServer: {
        hot: true,
        static: {
            directory: path.join(ROOT, 'dist'),
        },
        compress: true,
        port: 3000,
    },
})