const express=require('express')
const http=require('http')
const morgan=require('morgan')

const hostname='localhost'
const port=3000
// Initialize Express
const app=express()


//Configuring the App to use Morgan for Logging
app.use(morgan('dev'))


//Seeting the Directory to use the Files from 

app.use(express.static(__dirname+'/public'))

//Declaring App Parameters [Default Setup when the route not exits]
app.use((req,res,next)=>{
   
    res.statusCode=200
    res.setHeader('Content-Type','text/html')
    res.end(`<html><body><h1>Welcome to Express Server</h1></body></html>`)
})

//Create  http Server using App Parameters
const server=http.createServer(app)

//Listening to the Server
server.listen(port,hostname,()=>{
    console.log(`Server Running on http://${hostname}:${port}`)
})