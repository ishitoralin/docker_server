import { handleResponse, handleError, handleResult } from "./helper.js";
import Docker from "dockerode";
const docker = new Docker();

const imagesController = {
    GetList: async (req, res) => {
        try {
            const query = req.query
            docker.listImages(query, (err, data) => {
                return handleResponse(err, data, res);
            })
        } catch (error) {
            return handleError(res, error, 500)
        }
    },
    GetSearch: async (req, res) => {
        try {
            const query = req.query
            if (!query.term) {
                return handleError(res, "Invalid query: term", 400)
            }
            docker.searchImages(query, (err, data) => {
                return handleResponse(err, data, res);
            })
        } catch (error) {
            return handleError(res, error, 500)
        }
    },
    GetAction: async (req, res) => {
        try {
            const action = req.params.action;
            const name = req.params.name;
            const image = docker.getImage(name);

            if (action === "json") {
                image.inspect((err, data) => {
                    return handleResponse(err, data, res);
                });
            } else if (action === "history") {
                image.history((err, data) => {
                    return handleResponse(err, data, res);
                });
            } else {
                return handleError(res, { message: "" }, 404);
            }
        } catch (error) {
            return handleError(res, error, 500);
        }
    }
}



export default imagesController;
