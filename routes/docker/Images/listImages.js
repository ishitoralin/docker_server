const express = require('express')
const router = express.Router()

const { resultsHandler } = require('../processer');
const Docker = require('dockerode')
const docker = new Docker();

router.get('/json', (req, res) => {
    docker.listImages((err, data) => {
        resultsHandler(res, err, data)
    });
})

module.exports = router