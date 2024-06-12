const express = require('express')
const router = express.Router()

const { resultsHandler } = require('../processer');
const Docker = require('dockerode')
const docker = new Docker();

router.post('/:name/start', (req, res) => {
    const name = req.params.name
    docker.getContainer(name).start((err, data) => {
        resultsHandler(res, err, data);
    });
})

module.exports = router