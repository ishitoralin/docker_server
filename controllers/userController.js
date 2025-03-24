import { handleResult, handleError } from "./helper.js"
import { decrypt } from "./module.js"

const userController = {
    PostUserLogin: (req, res) => {
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
    },
}

export default userController
