import { handleResult } from "./helper.js";


const systemGetPing = (req, res) => {
    handleResult(res, "hello", 200)
    // res.status(200).json({ code: 200, result: "Hello, World!" });
};

const systemGetHello = (req, res) => {
    res.status(200).json({ code: 200, result: "Hello, World!" });
};

const systemController = { systemGetPing, systemGetHello };

export default systemController;
