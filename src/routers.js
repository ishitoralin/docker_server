import express from "express"
import systemController from '../controllers/systemController.js'
import imagesController from '../controllers/imagesController.js'

// import imagesController from '../controllers/imagesController'
// import containersController from '../controllers/containersController'
// import volumesController from '../controllers/volumesController'
// import networksController from '../controllers/networksController'
const router = express.Router();

router.use('/api/system/:action', systemController.GetAction);
router.use('/api/images/json', imagesController.GetList);
router.use('/api/images/search', imagesController.GetSearch);
router.use('/api/images/:name/:action', imagesController.GetAction);
// router.use('/containers', containerRouters);
// router.use('/volumes', volumeRouters);
// router.use('/networks', networkRouters);

export default router