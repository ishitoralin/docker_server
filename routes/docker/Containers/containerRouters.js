const express = require('express');
const router = express.Router();

const listContainers = require('./listContainers');

router.use('/', listContainers);


module.exports = router;
