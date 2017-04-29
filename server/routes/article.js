const express = require('express');
const router = express.Router();
const _ = require('underscore');

let allArticles = require('../mock/articles.json');

router
    .get("/articles", function (req, res) {
        var page = parseInt(req.query.pageSize) - 1;
        var count = parseInt(req.query.pageCount);
        var start = page * count;
        var end = start + count;
        var filterArticles = _.clone(allArticles);
        if (req.query.name) {
            filterArticles = allArticles.filter(t => { return t.name.includes(req.query.name) });
        }

        var resData = {
            status: 200,
            message: null,
            data: {
                result: [],
                total: 0
            }
        };

        resData.data.result = filterArticles.slice(start, end);
        resData.data.total = filterArticles.length;

        res.send(resData);
    })
    .get("/articles/:id", function (req, res) {
        const filterArticle = allArticles.find(function (t) { return t.id === req.params.id; });
        var resData = {
            status: 200,
            message: null,
            data: filterArticle
        };
        res.status(200).send(resData);
    })
    .post("/articles", function (req, res) {
        var data = {
            id: Date.now() + '',
            name: req.body.name,
            description: req.body.description
        };
        allArticles = allArticles.concat(data);

        var resData = {
            status: 200,
            message: null,
            data: data
        };

        res.status(200).send(resData);
    })
    .put("/articles/:id", function (req, res) {
        const filterArticle = allArticles.find(function (t) { return t.id === req.params.id; });
        filterArticle.title = req.body.title;
        filterArticle.description = req.body.description;

        var resData = {
            status: 200,
            message: null,
            data: filterArticle
        };

        res.status(200).send(resData);
    })
    .delete("/articles/:id", function (req, res) {
        allArticles = allArticles.filter(function (t) { return t.id !== req.params.id; });
        res.status(200).send(true);
    })

module.exports = router;