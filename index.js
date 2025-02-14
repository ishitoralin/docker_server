import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routers from './src/routers.js';
import fs from 'fs';
const app = express()

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

app.use('/', routers)

const isExist = fs.existsSync('./dist');

if (isExist) {
    app.use(express.static("./dist"));
    app.use('*', (req, res) => {
        res.sendFile('./dist/index.html');
    });
} else {
    app.use((err, req, res, next) => {
        console.log(err.message)
        res.status(500)
        res.send('500 - Server Error')
    })
    app.use('*', (req, res) => {
        res.status(404)
        res.send('404 - Page not found')
    });
}

export default app
