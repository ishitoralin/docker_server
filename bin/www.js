#!/usr/bin/env node
import fs from "fs"
import https from "https"
import os from "os"
import app from "../index.js"
import defaultPaths from '../init/pathDefault.js';
import { generateCert } from "../controllers/tlsController.js"
generateCert()

const options = {
    key: fs.readFileSync(defaultPaths.keyPath),
    cert: fs.readFileSync(defaultPaths.certPath)
};

const port = process.env.PORT || 8866;
app.set('port', port);

const server = https.createServer(options, app);

const getLocalIP = () => {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        for (const iface of interfaces[interfaceName]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

server.listen(port, () => {
    const actualPort = server.address().port;
    const localIP = getLocalIP();
    console.log(`Server is running on:`);
    console.log(`- Local:   https://localhost:${actualPort}`);
    console.log(`- Network: https://${localIP}:${actualPort}`);
});

server.on('error', (error) => {
    console.error("Server Error:", error);
    process.exit(1);
});
