var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var _ = require('underscore');

var config = require('./webpack.dev.config');

var allCategories = require('./mock/get-categories.json');

var port = 3000;
var app = express();
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src')));
// app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));

app.get("/api/categories", function (req, res) {
    var page = parseInt(req.query.pageSize) - 1;
    var count = parseInt(req.query.pageCount);
    var start = page * count;
    var end = start + count;
    var filterCategoryies = _.clone(allCategories);
    if (req.query.name) {
        filterCategoryies = allCategories.filter(t => { return t.name.includes(req.query.name)});
    }

    var resData = {
        status: 200,
        message: null,
        data: {
            result: [],
            total: 0
        }
    };

    resData.data.result = filterCategoryies.slice(start, end);
    resData.data.total = filterCategoryies.length;

    res.send(resData);
})

app.get("/api/categories/:id", function (req, res) {
    const filterCategory = allCategories.find(function (t) { return t.id === req.params.id; });
    var resData = {
        status: 200,
        message: null,
        data: filterCategory
    };
    res.status(200).send(resData);
})

app.post("/api/categories", function (req, res) {
    var data = {
        id: Date.now() + '',
        name: req.body.name,
        description: req.body.description,
        displayOrder: req.body.displayOrder,
        enabled: req.body.enabled
    };
    allCategories = allCategories.concat(data);

    var resData = {
        status: 200,
        message: null,
        data: data
    };

    res.status(200).send(resData);
})

app.put("/api/categories/:id", function (req, res) {
    const filterCategory = allCategories.find(function (t) { return t.id === req.params.id; });
    filterCategory.name = req.body.name;
    filterCategory.description = req.body.description;
    filterCategory.displayOrder = req.body.displayOrder;
    filterCategory.enabled = req.body.enabled;

    var resData = {
        status: 200,
        message: null,
        data: filterCategory
    };

    res.status(200).send(resData);
})

app.delete("/api/categories/:id", function (req, res) {
    allCategories = allCategories.filter(function (t) { return t.id !== req.params.id; });
    res.status(200).send(true);
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