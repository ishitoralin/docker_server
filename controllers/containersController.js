import { handleResponse, handleError, handleResult } from "./helper.js";
import Docker from "dockerode";
const docker = new Docker();
const containersController = {
    GetContainersList: (req, res) => {
        const query = req.query
        docker.listContainers(query, (err, data) => {
            return handleResponse(err, data, req, res);;
        })
    },
    GetContainerInspect: (req, res) => {
        const id = req.params.id;
        const query = req.query
        const container = docker.getContainer(id);
        container.inspect(query, (err, data) => {
            return handleResponse(err, data, req, res);;
        })
    },
    GetTop: (req, res) => {
        const id = req.params.id;
        const query = req.query
        const container = docker.getContainer(id);
        container.top(query, (err, data) => {
            return handleResponse(err, data, req, res);;
        })
    },
    GetLogs: (req, res) => {
        const id = req.params.id;
        const query = req.query
        const container = docker.getContainer(id);
        container.logs(query, (err, data) => {
            return handleResponse(err, data, req, res);;
        })
    },
    GetChanges: (req, res) => {
        const id = req.params.id;
        const container = docker.getContainer(id);
        container.changes((err, data) => {
            return handleResponse(err, data, req, res);;
        })
    },
    // TODO handleResponse >> res.pipe
    GetContainerExport: (req, res) => {
        const id = req.params.id;
        const container = docker.getContainer(id);
        container.export((err, data) => {
            return handleResponse(err, data, req, res);;
        })
    },
    // TODO handleResponse >> stream
    GetStats: (req, res) => {
        const id = req.params.id;
        const query = req.query
        const container = docker.getContainer(id);
        container.stats(query, (err, data) => {
            return handleResult(err, data, res);
        })
    },
    // TODO handleResponse >> ws
    GetAttach: (req, res) => {
        const id = req.params.id;
        const query = req.query
        const container = docker.getContainer(id);

        container.attach(query, (err, data) => {
            return handleResult(err, data, res);
        })
    },
    GetArchive: (req, res) => {
        const id = req.params.id;
        const path = req.query.path;
        if (!path) {
            return handleError(res, { message: "Parameter path is needed" }, 400);
        }

        const container = docker.getContainer(id);
        // TODO remove promise
        const stream = new Promise((resolve, reject) => {
            container.getArchive({ path }, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });

        res.setHeader("Content-Type", "application/x-tar");
        stream.pipe(res);
    },
    // PostCreateContainer: (req, res) => {
    //     const query = req.query
    //     const body = req.body
    //     docker.createContainer(body, (err, data) => {
    //         return handleResponse(err, data, req, res);;
    //     })
    // }
    PostContainerActions: (req, res) => {
        const id = req.params.id;
        const actions = req.params.actions;
        const container = docker.getContainer(id);
        container[actions]((err, data) => {
            return handleResponse(err, data, req, res);;
        })
    }
}

export default containersController;