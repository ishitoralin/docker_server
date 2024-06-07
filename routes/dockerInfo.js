const express = require('express')
const router = express.Router()

const Docker = require('dockerode')
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

router.get('/', (req, res, next) => {
    docker.info((err, info) => {
        console.log(info);
        res.send(info)
        // if (err) {
        //     console.error('Error connecting to Docker:', err);
        // } else {
        //     console.log('Docker info:', info);
        // }
    });
})

module.exports = router