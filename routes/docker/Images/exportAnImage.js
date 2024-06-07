const express = require('express')
const router = express.Router()

const { resultsHandler } = require('../processer');
const Docker = require('dockerode')
const docker = new Docker();

const fs = require('fs-extra')

router.get('/:name/get', (req, res) => {
    const imageName = req.params.name
    const image = docker.getImage(imageName)
    const exportStream = fs.createWriteStream(`${imageName}.tar`)
    image.get((err, stream) => {
        if (err) {
            resultsHandler(res, err, null);
            return;
        }

        stream.pipe(exportStream);

        exportStream.on('finish', () => {
            resultsHandler(res, null, { message: `Image ${imageName} exported successfully` });
        });

        exportStream.on('error', (err) => {
            resultsHandler(res, err, null);
        });
    });
})

module.exports = router