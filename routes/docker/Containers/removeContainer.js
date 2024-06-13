// routes/dockerRoutes.js
const express = require('express');
const router = express.Router();
const { resultsHandler } = require('../processer');
const Docker = require('dockerode');
const docker = new Docker();

router.delete('/:name', (req, res) => {
    const name = req.params.name;
    const container = docker.getContainer(name);

    container.inspect((err, data) => {
        if (err && err.statusCode === 404) {
            console.error(`Container with name ${name} does not exist`);
            return res.status(404).json({ error: `Container with name ${name} does not exist` });
        } else if (err) {
            console.error(`Error inspecting container ${name}:`, err);
            return res.status(500).json({ error: `Error inspecting container ${name}` });
        }

        container.remove((err, data) => {
            if (err) {
                console.error(`Error removing container ${name}:`, err);
                return res.status(500).json({ error: `Error removing container ${name}` });
            }

            console.log(`Container ${name} removed successfully`);
            resultsHandler(res, null, { message: `Container ${name} removed successfully` });
        });
    });
});

module.exports = router;
