import { exec, execSync, execFileSync } from 'child_process';

export const handleResponse = (err, data, req, res) => {
    console.log(err)
    if (err) {
        return handleError(res, err.json?.message || "An error occurred", err.statusCode || 500);
    }

    const method = req.method
    let statusCode = 200
    if (method === "POST") {
        statusCode = 201
    }
    if (method === "DELETE") {
        statusCode = 204
    }

    return handleResult(res, data, statusCode);
};

export const handleResult = (res, data, code) => {
    res.status(code).json({ status: code, result: data, reason: "ok" });
};

export const handleError = (res, error, errCode) => {
    if (!error) {
        switch (errCode) {
            case 400:
                error = "400 - Bad request";
                break;
            case 401:
                error = "401 - Unauthorized";
                break;
            case 403:
                error = "403 - Forbidden";
                break;
            case 404:
                error = "404 - Page not found";
                break;
            case 500:
                error = "500 - Server Error";
                break;
            default:
                error = "Unknown error occurred";
        }
    }

    res.status(errCode).json({ status: errCode, error: error });
};

export const handleExec = (cmd) => {
    return new Promise((resolve, reject) => {
        if (cmd) {
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    return reject(error);
                }

                if (stderr) {
                    return reject(stderr);
                }

                resolve(stdout);
            });
        } else {
            reject('command is required');
        }
    });
};

export const handleExecSync = (cmd) => {
    if (!cmd) {
        throw new Error('Command is required');
    }

    try {
        const stdout = execSync(cmd).toString();
        return stdout;
    } catch (error) {
        console.error('Command execution failed:', error.message);
        return error.message;
    }
};

export const handleExecFileSync = (cmd, arg = []) => {
    try {
        const stdout = execFileSync(cmd, arg, {
            stdio: 'pipe',
            encoding: 'utf8',
        });
        return stdout;
    } catch (error) {
        if (error.code) {
            return error.code;
        } else {
            const { stdout, stderr } = error;
            return { stdout, stderr };
        }
    }
};
