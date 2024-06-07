const express = require('express')
const router = express.Router()

const { resultsHandler } = require('../processer');
const Docker = require('dockerode')
const docker = new Docker();

router.get('/:name/history', (req, res) => {
    const imageName = req.params.name;
    docker.getImage(imageName).history((err, data) => {
        resultsHandler(res, err, data)
    });
})

module.exports = router