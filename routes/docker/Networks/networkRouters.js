const express = require('express');
const router = express.Router();

const listNetworks = require('./listNetworks');

router.use('/', listNetworks);


module.exports = router;
