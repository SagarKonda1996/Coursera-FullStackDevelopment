const express=require('express')
const http=require('http')
const morgan=require('morgan')
const bodyParser=require('body-parser')
const hostname='localhost'
const port=3000

// Initialize Express

const app=express()

/*
Configuring Express App

*/

//Configuring the App to use Morgan for Logging

app.use(morgan('dev'))

//Configuring to use Body Parser to parse json data from the body

app.use(bodyParser.json())

// For /dishes End point

app.all('/dishes',(req,res,next)=>{
    res.statusCode=200
    res.setHeader('Content-Type','text/plain')
    next();
    
})
//next Specifies to perform next possible operation 
// If we modify the Req or Res from where it is called then the modified values will passed to next possible operation

app.get('/dishes',(req,res,next)=>{
    res.end("Will Send All Dishes to You")
})

app.post('/dishes',(req,res,next)=>{
    res.end('will add the dish : '+ req.body.name +' '+req.body.description)
})

app.put('/dishes',(req,res,next)=>{
    res.statusCode=403
    res.end('PUT operation not Supported')
})

app.delete('/dishes',(req,res,next)=>{
    res.end('Deleting All dishes')
})

//For /dishes/:dishId
app.get('/dishes/:dishId',(req,res,next)=>{
    res.end(`Will Send ${req.params.dishId} Dish details to You`)
})

app.post('/dishes/:dishId',(req,res,next)=>{
    res.statusCode=403
    res.end('POST Operation Not Supported')
})

app.put('/dishes/:dishId',(req,res,next)=>{
    
    res.end(`Will Update Dish with dish Id ${req.params.dishId} With Details Name = ${req.body.name} and Description = ${req.body.description}`)
    
})

app.delete('/dishes/:dishId',(req,res,next)=>{
    res.end(`Deleting  dish with ${req.params.dishId}`)
})


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