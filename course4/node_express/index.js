const express=require('express')
const http=require('http')

const hostname='localhost'
const port=3000
// Initialize Express
const app=express()

//Declaring App Parameters
app.use((req,res,next)=>{
    console.log(req.headers)
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