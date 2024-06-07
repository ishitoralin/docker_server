const express = require('express');
const router = express.Router();

const { resultsHandler } = require('../processer');
const Docker = require('dockerode');
const docker = new Docker();

router.get('/events', (req, res) => {
    docker.getEvents({ since: 1717656974, until: 1717743374 }, (err, data) => {
        resultsHandler(res, err, data);
    });
});

module.exports = router;
