import express from "express"
import systemController from '../controllers/systemController.js'
// import imagesController from '../controllers/imagesController'
// import containersController from '../controllers/containersController'
// import volumesController from '../controllers/volumesController'
// import networksController from '../controllers/networksController'
const router = express.Router();

router.use('/api/system/ping', systemController.systemGetPing);
// router.use('/images', imageRouters);
// router.use('/containers', containerRouters);
// router.use('/volumes', volumeRouters);
// router.use('/networks', networkRouters);

export default router