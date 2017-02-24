
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var express = require('express');
var path = require('path');
var open = require('open');
var favicon = require('serve-favicon');

var config = require('./webpack.dev.config');

/* eslint-disable no-console */
var port = 3000;
var app = express();
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname, 'src')));
// app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
        open(`http://localhost:${port}`);
    }
});