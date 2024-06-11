const express = require('express');
const router = express.Router();

const volumeList = require('./volumeList');

router.use('/', volumeList);


module.exports = router;
