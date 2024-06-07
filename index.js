const express = require('express')
const cors = require('cors')
const app = express()
const dockerRouters = require('./routes/dockerRouters')

app.get('/', (req, res) => {
    res.type('text/plain')
    res.send('Welcome to Docker Remote API')
})

app.use('/api/docker', dockerRouters)

// cors: 3000 for fronted-end, 8080 for database(MySQL)
const whitelist = ['http://localhost:3000/', 'http://localhost:8080/']
app.use(
    cors({
        origin: whitelist,
        credentials: true,
    })
);

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