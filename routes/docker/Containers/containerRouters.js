const express = require('express');
const router = express.Router();

const listContainers = require('./listContainers');
const startContainer = require('./startContainer');
const removeContainer = require('./removeContainer');

router.use('/', listContainers);
router.use('/', startContainer);
router.use('/', removeContainer);


module.exports = router;
