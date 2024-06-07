const express = require('express')
const router = express.Router()

const { resultsHandler } = require('../processer');
const Docker = require('dockerode')
const docker = new Docker();

router.get('/', (req, res) => {
    docker.info((err, data) => {
        docker.get((err, data) => {
            resultsHandler(res, err, data)
        });
    });
})

module.exports = router