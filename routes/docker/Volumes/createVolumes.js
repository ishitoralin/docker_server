const express = require('express')
const router = express.Router()

const { resultsHandler } = require('../processer');
const Docker = require('dockerode')
const docker = new Docker();
router.use(express.json());
router.post('/create', (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Need property in request body to create volume" });
    }
    const options = {}
    if (req.body.name) {
        options['name'] = req.body.name
    }
    docker.createVolume(options, (err, data) => {
        resultsHandler(res, err, data)
    });
})

module.exports = router