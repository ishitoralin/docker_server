import { exec, execSync, execFileSync } from 'child_process';
export const handleResponse = (err, data, res) => {
    if (err) {
        return handleError(res, err, 400);
    }

    return handleResult(res, data, 200);
};

export const handleResult = (res, data, code) => {
    res.status(code).json({ status: code, result: data, reason: "ok" });
};

export const handleError = (res, error, errCode) => {
    if (errCode === 400 && !error) {
        error = "400 - Bad request";
    }

    if (errCode === 401 && !error) {
        error = "401 - Unauthorized"
    }

    if (errCode === 403 && !error) {
        error = "403 - Forbidden";
    }

    if (errCode === 404 && !error) {
        error = "404 - Page not found";
    }

    if (errCode === 500 && !error) {
        error = "500 - Server Error";
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
