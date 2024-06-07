const express = require('express')
const router = express.Router()

const Docker = require('dockerode')
const docker = new Docker();

router.get('/containers/list', (req, res) => {
    docker.listContainers({ all: true }, (err, data) => {
        if (err) {
            console.error('Error getting Docker version:', err);
            res.status(500).json({ error: 'Error getting Docker version' });
        } else {
            res.json(data);
        }
    });
})

module.exports = router