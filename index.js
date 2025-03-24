import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routers from './src/routers.js';
const app = express()

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

app.use('/', routers)

app.use(express.static("./dist"));
app.use('*', (req, res) => {
    res.sendFile('./dist/index.html');
});

export default app
