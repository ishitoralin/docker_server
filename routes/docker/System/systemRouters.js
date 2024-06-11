const express = require('express');
const router = express.Router();

const getSystemInformation = require('./getSystemInformation');
const getVersion = require('./getVersion');
const monitorEvents = require('./monitorEvents');
const getDataUsageInformation = require('./getDataUsageInformation');

router.use('/', getSystemInformation);
router.use('/', getVersion);
router.use('/', monitorEvents);
router.use('/', getDataUsageInformation);

module.exports = router;
