const express = require('express')
const cors = require('cors')
const app = express()
const dockerRouters = require('./routes/dockerRouters')

app.get('/', (req, res) => {
    res.type('text/plain')
    res.send('Welcome to Docker Remote API')
})

// const whitelist = ['http://10.15.1.82:3000', 'http://10.15.1.82:8080', 'http://10.15.1.82:3001'];
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,
// };

app.use(cors());

app.use('/api/docker', dockerRouters)

app.use((err, req, res, next) => {
    console.log(err.message)
    res.status(500)
    res.send('500 - Server Error')
})

app.use('*', (req, res) => {
    res.status(404).json({ message: 'the page does not exist' })
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}`)
})