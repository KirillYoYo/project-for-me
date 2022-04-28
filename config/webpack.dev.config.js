const path = require('path');

const ROOT = path.resolve(__dirname, '..')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(ROOT, 'dist'),
    },
};