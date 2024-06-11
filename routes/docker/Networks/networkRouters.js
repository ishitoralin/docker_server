const express = require('express');
const router = express.Router();

const networkList = require('./networkList');

router.use('/', networkList);


module.exports = router;
