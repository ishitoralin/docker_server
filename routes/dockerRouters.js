const express = require('express');
const router = express.Router();

const systemIndex = require('./docker/System/systemIndex');
const imagesIndex = require('./docker/Images/imagesIndex');

router.use('/', systemIndex);
router.use('/images', imagesIndex);
// router.use('/container', systemIndex);

module.exports = router;
