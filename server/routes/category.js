const express = require('express');
const router = express.Router();
const _ = require('underscore');

let allCategories = require('../mock/categories.json');

router
    .get("/categories", function (req, res) {
        var page = parseInt(req.query.pageSize) - 1;
        var count = parseInt(req.query.pageCount);
        var start = page * count;
        var end = start + count;
        var filterCategoryies = _.clone(allCategories);
        if (req.query.name) {
            filterCategoryies = allCategories.filter(t => { return t.name.includes(req.query.name) });
        }

        var resData = {
            status: 200,
            message: null,
            data: {
                result: [],
                total: 0
            }
        };

        resData.data.result = [];
        resData.data.total = filterCategoryies.length;

        res.send(resData);
    })
    .get("/categories/:id", function (req, res) {
        const filterCategory = allCategories.find(function (t) { return t.id === req.params.id; });
        var resData = {
            status: 200,
            message: null,
            data: filterCategory
        };
        res.status(200).send(resData);
    })
    .post("/categories", function (req, res) {
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
    .put("/categories/:id", function (req, res) {
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
    .delete("/categories/:id", function (req, res) {
        allCategories = allCategories.filter(function (t) { return t.id !== req.params.id; });
        res.status(200).send(true);
    })

module.exports = router;