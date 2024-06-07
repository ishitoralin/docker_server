const express = require('express')
const router = express.Router()

const { resultsHandler } = require('../processer');
const Docker = require('dockerode')
const docker = new Docker();

router.get('/search', (req, res) => {
    const query = req.query
    const term = query.term;
    const limit = query.limit || null;
    const filters = query.filters || null;
    docker.searchImages({
        term: term,
        limit: limit,
        filters: filters
    }, (err, data) => {
        resultsHandler(res, err, data)
    });
})

module.exports = router