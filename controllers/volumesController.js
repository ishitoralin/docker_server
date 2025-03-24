import { handleResponse, handleError, handleResult } from "./helper.js";
import Docker from "dockerode";
const docker = new Docker();
const volumesController = {
    GetVolumesList: (req, res) => {
        const query = req.query
        docker.listVolumes(query, (err, data) => {
            return handleResponse(err, data, req, res);;
        })
    },
    GetVolumesInspect: (req, res) => {
        const name = req.params.name;
        const query = req.query
        const volume = docker.getVolume(name);
        volume.inspect(query, (err, data) => {
            return handleResponse(err, data, req, res);;
        })
    },
    PostCreateVolume: (req, res) => {
        const body = req.body
        docker.createVolume(body, (err, data) => {
            return handleResponse(err, data, req, res);;
        })
    },
    PostPruneVolumes: (req, res) => {
        const query = req.query
        docker.pruneVolumes(query, (err, data) => {
            return handleResponse(err, data, req, res);;
        });
    },
    PutUpdateVolume: (req, res) => {
        const id = req.params.id;
        const body = req.body
        const volume = docker.getVolume(id);
        volume.update(body, (err, data) => {
            return handleResponse(err, data, req, res);;
        });
    },
    DeleteVolume: (req, res) => {
        const id = req.params.id;
        const volume = docker.getVolume(id);
        volume.remove((err) => {
            return handleResponse(err, "", req, res)
        });
    }
}

export default volumesController
