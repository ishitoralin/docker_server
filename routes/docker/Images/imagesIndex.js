const express = require('express');
const router = express.Router();

const listImages = require('./listImages');
const InspectAnImage = require('./inspectAnImage');
const getTheHistoryOfAnImage = require('./getTheHistoryOfAnImage');
const searchImages = require('./searchImages');
const exportAnImage = require('./exportAnImage');

router.use('/', listImages);
router.use('/', InspectAnImage);
router.use('/', getTheHistoryOfAnImage);
router.use('/', searchImages);
router.use('/', exportAnImage);

module.exports = router;
