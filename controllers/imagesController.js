import { handleResponse, handleError, handleResult } from "./helper.js";
import Docker from "dockerode";
const docker = new Docker();

const imagesController = {
    GetImagesList: (req, res) => {
        const query = req.query
        docker.listImages(query, (err, data) => {
            return handleResponse(err, data, req, res);;
        })
    },
    GetSearch: (req, res) => {
        const query = req.query
        if (!query.term) {
            return handleError(res, "Invalid query: term", 400)
        }
        docker.searchImages(query, (err, data) => {
            return handleResponse(err, data, req, res);;
        })
    },
    GetImageInspect: (req, res) => {
        const name = req.params.name;
        const image = docker.getImage(name);

        image.inspect((err, data) => {
            return handleResponse(err, data, req, res);;
        });
    },
    GetHistory: (req, res) => {
        const name = req.params.name;
        const image = docker.getImage(name);

        image.history((err, data) => {
            return handleResponse(err, data, req, res);;
        });
    },
    GetExport: (req, res) => {
        // TODO handleResponse >> res.pipe
        const id = req.params.id;
        const image = docker.getImage(id);

        image.get((err, data) => {
            return handleResponse(err, data, req, res);;
        });
    },
    // TODO handleResponse >> stream
    PostBuildImage: (req, res) => {
        const query = req.query
        const tarStream = req.body.tarStream;
        const image = docker.getImage(query.name);

        image.buildImage(tarStream, query, (err, data) => {
            return handleResponse(err, data, req, res);;
        });
    },
    PostTagImage: (req, res) => {
        const id = req.params.id;
        const body = req.body
        const image = docker.getImage(id);
        image.tag(body, (err, data) => {
            return handleResponse(err, data, req, res);;
        });
    },
    PostPruneImages: (req, res) => {
        const query = req.query
        docker.pruneImages(query, (err, data) => {
            return handleResponse(err, data, req, res);;
        });
    },
    PostCommit: (req, res) => {
        const query = req.query
        const body = req.body
        docker.commit(query, body, (err, data) => {
            return handleResponse(err, data, req, res);;
        });
    },
    DeleteImage: (req, res) => {
        const id = req.params.id;
        const query = req.query
        const image = docker.getImage(id);
        image.remove(query, (err, data) => {
            return handleResponse(err, data, req, res);;
        });
    }
}
export default imagesController;
