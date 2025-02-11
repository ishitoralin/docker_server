import { handleResponse, handleError, handleResult } from "./helper.js";
import Docker from "dockerode";
const docker = new Docker();
const networksController = {
    GetNetworksList: (req, res) => {
        const query = req.query
        docker.listNetworks(query, (err, data) => {
            return handleResponse(err, data, req, res);
        })
    },
    GetNetworkInspect: (req, res) => {
        const id = req.params.id;
        const query = req.query.ee
        const network = docker.getNetwork(id);
        network.inspect(query, (err, data) => {
            return handleResponse(err, data, req, res);
        })
    },
    PostCreateNetwork: (req, res) => {
        const body = req.body
        docker.createNetwork(body, (err, data) => {
            return handleResponse(err, data, req, res);
        })
    },
    PostConnectAction: (req, res) => {
        const action = req.params.action
        const id = req.params.id
        const body = req.body
        const validActions = ['connect', 'disconnect'];
        if (!validActions.includes(action)) {
            return handleError(res, { message: 'Invalid action.' }, 400);
        }
        docker.network[id][action](body, (err, data) => {
            return handleResponse(err, data, req, res);
        });
    },
    PostPruneNetworks: (req, res) => {
        const query = req.query
        docker.pruneNetworks(query, (err, data) => {
            return handleResponse(err, data, req, res);
        });
    },
    DeleteNetwork: (req, res) => {
        const id = req.params.id;
        const network = docker.getNetwork(id);
        network.remove((err) => {
            return handleResponse(err, "", req, res)
        });
    }
}

export default networksController