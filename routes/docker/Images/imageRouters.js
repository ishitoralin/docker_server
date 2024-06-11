const express = require('express');
const router = express.Router();

const ImageList = require('./ImageList');
const InspectAnImage = require('./inspectAnImage');
const getTheHistoryOfAnImage = require('./getTheHistoryOfAnImage');
const searchImages = require('./searchImages');
const exportAnImage = require('./exportAnImage');

router.use('/', ImageList);
router.use('/', InspectAnImage);
router.use('/', getTheHistoryOfAnImage);
router.use('/', searchImages);
router.use('/', exportAnImage);

module.exports = router;
