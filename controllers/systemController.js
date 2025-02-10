import { handleResponse, handleError, handleResult } from "./helper.js";
import Docker from "dockerode";
const docker = new Docker();

const systemController = {
    GetAction: async (req, res) => {
        try {
            const action = req.params.action
            if (docker[action]) {
                docker[action]((err, data) => {
                    return handleResponse(err, data, res)
                })
            } else {
                return handleError(res, "", 404)
            }
        } catch (error) {
            return handleError(res, error.message, 500)
        }
    },
}

export default systemController;
