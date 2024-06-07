const express = require('express')
const router = express.Router()

const { resultsHandler } = require('../processer')
const Docker = require('dockerode')
const docker = new Docker();

router.get('/system/df', (req, res) => {
    docker.df((err, data) => {
        resultsHandler(res, err, data)
    });
})

module.exports = router