import jwt from "jsonwebtoken"
import { handleResult, handleError } from "./helper.js"
import { decrypt } from "./module.js"

export const PostUserLogin = (req, res) => {
    try {
        const user = decrypt(req.body.user)
        const password = decrypt(req.body.password)
        // const userInfo = checkUser(user, password)

        if (!userInfo) {
            return handleError(res, "Invalid credentials", 401);
        }

        const payload = { id: userInfo.id, user: userInfo.user, timestamp: new Date() };
        const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });

        return handleResult(res, token, 200);
    } catch (error) {
        const status = error.status
        return handleError(res, error.message, status)
    }
};

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        req.user = user;
        next();
    });
}