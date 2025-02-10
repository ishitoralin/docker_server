import express from 'express';
import os from "os"
import cors from 'cors';
import morgan from 'morgan';
import routers from './src/routers.js';
const app = express()

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

app.use('/', routers)

// app.use(express.static(path.join(__dirname, 'dist')));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.use((err, req, res, next) => {
    console.log(err.message)
    res.status(500)
    res.send('500 - Server Error')
})

app.use('*', (req, res) => {
    // res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    res.status(404)
    res.send('404 - Page not found')
});

const getLocalIP = () => {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        for (const iface of interfaces[interfaceName]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}

const port = process.env.PORT || 8866
const server = app.listen(port, '0.0.0.0', () => {
    const actualPort = server.address().port;
    const localIP = getLocalIP();
    console.log(`Server is running on:`);
    console.log(`- Local:   http://localhost:${actualPort}`);
    console.log(`- Network: http://${localIP}:${actualPort}`);
});