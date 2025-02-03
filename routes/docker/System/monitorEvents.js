import express from "express"
const router = express.Router();

const { resultsHandler } = require('../processer');
const Docker = require('dockerode');
const docker = new Docker();

router.get('/events', (req, res) => {
    const since = req.params.since
    const until = req.params.until
    console.log(since, until);
    docker.getEvents({ since: since, until: until }, (err, data) => {
        resultsHandler(res, err, data);
    });
});

module.exports = router;
