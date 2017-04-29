const router = require('express').Router();
const _ = require('underscore');
const util = require('../util');

let collection = require('../mock/tags.json');

router
    .get("/tags", (req, res) => {
        const pagination = util.getPagination(req.query.pageSize, req.query.pageCount);
        let filterData = _.clone(collection);
        if (req.query.keyword) {
            filterData = filterData.filter(t => 
            t.name.includes(req.query.keyword) || 
            t.slug.includes(req.query.keyword) ||
            t.description.includes(req.query.keyword));
        }
        if (req.query.enabled) {
            filterData = filterData.filter(t => t.enabled == req.query.enabled);
        }
        const resData = {
            status: 200,
            message: null,
            data: {
                result: filterData.slice(pagination.start, pagination.end),
                total: filterData.length
            }
        };
        res.send(resData);
    })
    .get("/tags/:id", (req, res) => {
        const row = util.getById(collection, req.params.id);
        const resData = {
            status: 200,
            message: null,
            data: row
        };
        res.send(resData);
    })
    .post("/tags", (req, res) => {
        const row = { id: String(Date.now()), create: Date.now(), update: Date.now() }
        util.setModelData(data, req.body);
        collection = collection.concat(row);

        const resData = {
            status: 200,
            message: null,
            data: row
        };
        res.send(resData);
    })
    .put("/tags/:id", (req, res) => {
        const row = util.getById(collection, req.params.id);
        row.update = Date.now();
        util.setModelData(row, req.body);

        const resData = {
            status: 200,
            message: null,
            data: row
        };
        res.send(resData);
    })
    .delete("/tags/:id", (req, res) => {
        collection = util.deleteById(collection, req.params.id);
        res.send(true);
    })

module.exports = router;