const express = require('express')
const router = express.Router()

const { resultsHandler } = require('../processer');
const Docker = require('dockerode')
const docker = new Docker();

router.get('/json', (req, res) => {
    docker.listContainers({ all: true }, (err, data) => {
        resultsHandler(res, err, data)
    });
})

module.exports = router