const express = require('express')
const router = express.Router()

const { resultsHandler } = require('../processer');
const Docker = require('dockerode')
const docker = new Docker();

router.get('/:name/json', (req, res) => {
    const imageName = req.params.name;
    docker.getImage(imageName).inspect((err, data) => {
        resultsHandler(res, err, data)
    });
})

module.exports = router