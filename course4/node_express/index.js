const express=require('express')
const http=require('http')
const morgan=require('morgan')
const bodyParser=require('body-parser')
const dishRouter=require('./routes/dishRouter')
const promotionsRouter=require('./routes/promoRouter')
const leadersRouter=require('./routes/leaderRouter')

const hostname='localhost'
const port=3000

const app=express()
app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/dishes',dishRouter)
app.use('/promotions',promotionsRouter)
app.use('/leaders',leadersRouter)


//Serve Files from Directory

app.use(express.static(__dirname+'/public'))





//[Default Setup when the route not exits]

app.use((req,res,next)=>{
   
    res.statusCode=200
    res.setHeader('Content-Type','text/html')
    res.end(`<html><body><h1>Welcome to Express Server</h1></body></html>`)
})


/*
Server Setup
*/

//Create  http Server using App Parameters
const server=http.createServer(app)

/*
Listening to the Server
*/
server.listen(port,hostname,()=>{
    console.log(`Server Running on http://${hostname}:${port}`)
})