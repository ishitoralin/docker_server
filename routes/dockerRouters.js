const express = require('express');
const router = express.Router();

const systemRouters = require('./docker/System/systemRouters');
const imageRouters = require('./docker/Images/imageRouters');
const containerRouters = require('./docker/Containers/containerRouters');
const volumeRouters = require('./docker/Volumes/volumeRouters');
const networkRouters = require('./docker/Networks/networkRouters');

router.use('/', systemRouters);
router.use('/images', imageRouters);
router.use('/containers', containerRouters);
router.use('/volumes', volumeRouters);
router.use('/networks', networkRouters);

module.exports = router;
