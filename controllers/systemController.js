import { handleResponse, handleError, handleResult } from "./helper.js";
import Docker from "dockerode";
const docker = new Docker();

const systemController = {
    GetPing: (req, res) => {
        docker.ping((err, data) => {
            return handleResponse(err, data, req, res);
        })
    },
    GetInfo: (req, res) => {
        docker.info((err, data) => {
            return handleResponse(err, data, req, res);
        })
    },
    GetVersion: (req, res) => {
        docker.version((err, data) => {
            return handleResponse(err, data, req, res);
        })
    },
    // TODO handleResponse >> res.pipe
    GetEvents: (req, res) => {
        const query = req.query
        docker.getEvents(query, (err, data) => {
            return handleResponse(err, data, req, res);
        })
    },
    GetSystemDF: (req, res) => {
        const query = req.query
        docker.df(query, (err, data) => {
            return handleResponse(err, data, req, res);
        })
    },
}

export default systemController;
