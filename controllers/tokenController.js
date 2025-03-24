import jwt from "jsonwebtoken"

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
