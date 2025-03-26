import { handleResponse, handleError, handleResult } from "./helper.js";
import Docker from "dockerode";
const docker = new Docker();

const imagesController = {
    GetImagesList: (req, res) => {
        const query = req.query
        docker.listImages(query, (err, data) => {
            return handleResponse(err, data, req, res);
        })
    },
    GetSearch: (req, res) => {
        const query = req.query
        if (!query.term) {
            return handleError(res, "Invalid query: term", 400)
        }
        docker.searchImages(query, (err, data) => {
            return handleResponse(err, data, req, res);
        })
    },
    GetImageInspect: (req, res) => {
        const id = req.params.id;
        const image = docker.getImage(id);

        image.inspect((err, data) => {
            return handleResponse(err, data, req, res);
        });
    },
    GetHistory: (req, res) => {
        const id = req.params.id;
        const image = docker.getImage(id);

        image.history((err, data) => {
            return handleResponse(err, data, req, res);
        });
    },
    // TODO progreeSize always > totalSize, fix it
    GetExport: (req, res) => {
        const id = req.params.id;
        const image = docker.getImage(id);
        let totalSize = 0;
        let progreeSize = 0;

        image.inspect((err, data) => {
            if (err) {
                return handleError(res, err, 404)
            }
            totalSize = data.Size
        });

        image.get((err, stream) => {
            if (err) {
                return handleResponse(err, null, req, res);
            }

            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename=${id}.tar`);

            stream.on("data", (chunk) => {
                progreeSize += chunk.length;
                console.log(`Export: ${progreeSize}/${totalSize} bytes, ${(progreeSize / totalSize * 100).toFixed(1)}%`);
            })

            stream.on('error', (err) => {
                return handleResponse(err, null, req, res);
            });

            stream.pipe(res);
        });
    },
    // TODO handleResponse >> stream
    PostBuildImage: (req, res) => {
        const query = req.query
        const tarStream = req.body.tarStream;
        const image = docker.getImage(query.id);

        image.buildImage(tarStream, query, (err, data) => {
            return handleResponse(err, data, req, res);
        });
    },
    PostCreateImage: async (req, res) => {
        const { fromImage } = req.query;
        if (!fromImage) {
            return handleError(res, "Invalid image name", 404)
        }

        try {
            const stream = await docker.pull(fromImage);
            docker.modem.followProgress(stream, (err, data) => {
                return handleResponse(err, data, req, res);
            });
        } catch (error) {
            return handleError(res, error.message || "Failed to pull image", error.statusCode || 500);
        }
    },
    PostTagImage: (req, res) => {
        const id = req.params.id;
        const body = req.body
        if (!body || !body.tag || !body.repo) {
            return handleError(res, "Invalid body", 400)
        }

        const image = docker.getImage(id);
        image.tag(body, (err, data) => {
            return handleResponse(err, data, req, res);
        });
    },
    PostPruneImages: (req, res) => {
        const query = req.query
        docker.pruneImages(query, (err, data) => {
            return handleResponse(err, data, req, res);
        });
    },
    PostCommit: (req, res) => {
        const query = req.query
        const body = req.body

        const container = docker.getContainer(query.container)
        if (!container) {
            return handleError(res, "Can't find container", 404)
        }

        container.commit({ ...query, ...body }, (err, data) => {
            return handleResponse(err, data, req, res);
        });
    },
    DeleteImage: (req, res) => {
        const id = req.params.id;
        const query = req.query
        const image = docker.getImage(id);
        image.remove(query, (err, data) => {
            return handleResponse(err, data, req, res);
        });
    }
}
export default imagesController;
