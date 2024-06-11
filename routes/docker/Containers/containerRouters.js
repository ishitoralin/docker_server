const express = require('express');
const router = express.Router();

const containerList = require('./containerList');

router.use('/', containerList);


module.exports = router;
