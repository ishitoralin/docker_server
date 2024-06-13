const express = require('express');
const router = express.Router();

const listVolumes = require('./listVolumes');
const createVolumes = require('./createVolumes');

router.use('/', listVolumes);
router.use('/', createVolumes);


module.exports = router;
