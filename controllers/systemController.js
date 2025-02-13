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
    GetEvents: (req, res) => {
        const query = req.query;
        docker.getEvents(query, (err, stream) => {
            if (err) {
                return handleResponse(err, null, req, res);
            }
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            stream.on('data', (chunk) => {
                res.write(`${chunk.toString()}`);
            });

            stream.on('end', () => {
                res.end();
            });

            stream.on('error', (streamErr) => {
                res.write(`${streamErr.toString()}`);
            });

            req.on('close', () => {
                stream.destroy();
            });
        });
    },
    GetSystemDF: (req, res) => {
        const query = req.query
        docker.df(query, (err, data) => {
            return handleResponse(err, data, req, res);
        })
    },
}

export default systemController;
