#!/usr/bin/env node
import express from 'express';
import fs from "fs"
import path from "path"
import https from "https"
import routers from './src/routers.js';
const { generateCert } = require("../controllers/tlsController.js");
const app = express();
generateCert()
const keyPath = "../otakey.pem";
const certPath = "../otakey.cert";
const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
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
    console.log(`- Local:   http://localhost:${actualPort}`);
    console.log(`- Network: http://${localIP}:${actualPort}`);
});

server.on('error', (error) => {
    console.error("Server Error:", error);
    process.exit(1);
});
