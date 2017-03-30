var path = require('path');
var webpack = require('webpack');

module.exports = {
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        'babel-polyfill',
        './src/app'
    ],
    output: {
        path: path.join(__dirname, 'src'),
        filename: 'build.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        loaders: [
            { test: /\.(js|jsx)$/, loaders: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css?$/, loaders: ['style-loader', 'css-loader'] },
            { test: /\.scss$/, loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'] },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=25000' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
            { test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }
        ]
    }
};