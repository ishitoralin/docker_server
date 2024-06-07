const express = require('express')
const cors = require('cors')
const app = express()

app.get('/',(req,res)=>{
    res.type('text/plain')
    res.send('homeadas')
})

app.get('/about',(req,res)=>{
    res.type('text/plain')
    res.send('about')
})

// app.use(express.static(__dirname+'/public')

// cors: 3000 for fronted-end, 8080 for database(MySQL)
const whitelist = ['http://localhost:3000/','http://localhost:8080/']
app.use(
    cors({
      origin: whitelist,
      credentials: true,
    })
  );

app.use((err, req, res,next)=>{
    console.log(err.message)
    res.status(500)
    res.send('500 - Server Error')
})


app.use('*',(req,res)=>{
    res.status(404).json({message:'the page does not exist'})
})
const port = process.env.PORT || 3001
app.listen(port, ()=>{
    console.log(`Express started on http://localhost:${port}`)
})