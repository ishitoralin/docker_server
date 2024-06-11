const express = require('express');
const router = express.Router();

const listVolumes = require('./listVolumes');

router.use('/', listVolumes);


module.exports = router;
