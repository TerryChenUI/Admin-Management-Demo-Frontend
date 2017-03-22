
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var config = require('./webpack.dev.config');

var getCategories = require('./mock/get-categories.json');
var getCategory = require('./mock/get-category.json');

var port = 3000;
var app = express();
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname, 'src')));
// app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));

app.get("/api/categories", function (req, res) {
    var page = parseInt(req.query.page) - 1;
    var count = parseInt(req.query.count);
    var start = page * count;
    var end = start + count;

    var resData = {
        status: 200,
        message: null,
        data: {
            result: [],
            total: 0
        }
    };

    resData.data.result = getCategories.slice(start, end);
    resData.data.total = getCategories.length;
    // resData.data.total = Math.ceil(getCategories.length / count);

    res.status(200).send(resData);
})

app.get("/api/categories/:id", function (req, res) {
    res.send(getCategory);
})

app.post("/api/categories", function (req, res) {
    // res.send(getCategory);
    res.send({
        "status": "200",
        "message": null,
        "data": {
            "id": 1,
            "name": "已新增",
            "imageUrl": "",
            "description": "Adidas 品牌",
            "displayOrder": 1,
            "enabled": true,
            "create": "2016-07-21 14:17:56Z",
            "update": "2016-07-22 22:30:22Z"
        }
    })
    // res.send({
    //     "status": "400",
    //     "message": 'update category error message'
    // })
})

app.put("/api/categories/:id", function (req, res) {
    // res.send(getCategory);
    res.send({
        "status": "200",
        "message": null,
        "data": {
            "id": 1,
            "name": "已更新",
            "imageUrl": "",
            "description": "Adidas 品牌",
            "displayOrder": 1,
            "enabled": true,
            "create": "2016-07-21 14:17:56Z",
            "update": "2016-07-22 22:30:22Z"
        }
    })
    // res.send({
    //     "status": "500",
    //     "message": 'update category error message'
    // })
})

app.delete("/api/categories/:id", function (req, res) {
    res.send(getCategory);
})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});