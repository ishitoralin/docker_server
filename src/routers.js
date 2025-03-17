import express from "express"
import systemController from '../controllers/systemController.js'
import imagesController from '../controllers/imagesController.js'
import containersController from '../controllers/containersController.js'
import networksController from '../controllers/networksController.js'
import volumesController from '../controllers/volumesController.js'
import { authenticateToken } from "../controllers/userController.js"
const router = express.Router();

router.get('/api/docker/ping', systemController.GetPing);
router.get('/api/docker/info', systemController.GetInfo);
router.get('/api/docker/version', systemController.GetVersion);
router.get('/api/docker/events', systemController.GetEvents);
router.get('/api/docker/system/df', systemController.GetSystemDF);


router.get('/api/docker/images/json', imagesController.GetImagesList);
router.get('/api/docker/images/search', imagesController.GetSearch);
router.get('/api/docker/images/:id/json', imagesController.GetImageInspect);
router.get('/api/docker/images/:id/history', imagesController.GetHistory);
router.get('/api/docker/images/:id/get', imagesController.GetExport);
router.post('/api/docker/build', imagesController.PostBuildImage);
// router.post('/api/docker/build/prune', imagesController.PostPruneCache);
router.post('/api/docker/images/create', imagesController.PostCreateImage);
// router.post('/api/docker/images/:id/push', imagesController.PostPushImage);
router.post('/api/docker/images/:id/tag', imagesController.PostTagImage);
router.post('/api/docker/images/prune', imagesController.PostPruneImages);
router.post('/api/docker/commit', imagesController.PostCommit);
// router.post('/api/docker/images/load', imagesController.PostImportImage);
router.delete('/api/docker/images/:id', imagesController.DeleteImage);


router.get('/api/docker/containers/json', containersController.GetContainersList);
router.get('/api/docker/containers/:id/json', containersController.GetContainerInspect);
router.get('/api/docker/containers/:id/top', containersController.GetTop);
router.get('/api/docker/containers/:id/logs', containersController.GetLogs);
router.get('/api/docker/containers/:id/changes', containersController.GetChanges);
router.get('/api/docker/containers/:id/export', containersController.GetContainerExport);
router.get('/api/docker/containers/:id/stats', containersController.GetStats);
router.get('/api/docker/containers/:id/attach/ws', containersController.GetAttach);
router.get('/api/docker/containers/:id/archive', containersController.GetArchive);
// router.post('/api/docker/containers/create', containersController.PostCreateContainer);
router.post('/api/docker/containers/:id/:actions', containersController.PostContainerActions);

router.get('/api/docker/networks/:id', networksController.GetNetworkInspect);
router.get('/api/docker/networks', networksController.GetNetworksList);
router.post('/api/docker/networks/create', networksController.PostCreateNetwork);
router.post('/api/docker/networks/:id/:action', networksController.PostConnectAction);
router.post('/api/docker/networks/prune', networksController.PostPruneNetworks);
router.delete('/api/docker/networks/:id', networksController.DeleteNetwork);


router.get('/api/docker/volumes/:id', volumesController.GetVolumesInspect);
router.get('/api/docker/volumes', volumesController.GetVolumesList);
router.post('/api/docker/volumes/create', volumesController.PostCreateVolume);
router.post('/api/docker/volumes/prune', volumesController.PostPruneVolumes);
router.put('/api/docker/volumes/:id', volumesController.PutUpdateVolume);
router.delete('/api/docker/volumes/:id', volumesController.DeleteVolume);

export default router