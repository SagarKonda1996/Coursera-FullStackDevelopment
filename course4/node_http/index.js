const http=require('http')
const fs=require('fs')
const path=require('path')

const hostname='localhost'
const port=3000


const server=http.createServer((req,res)=>{
    console.log(`Request For ${req.url} Method ${req.method}`)
    res.statusCode=200
    if(req.method=='GET')
    {
        var fileUrl;
        if(req.url=='/')
            fileUrl='/index.html'
        else
            fileUrl=req.url
        var filePath=path.resolve('./public'+fileUrl)
        const  fileExt=path.extname(filePath)
        if(fileExt=='.html')
        {
            fs.exists(filePath,(exists)=>
            {
                if(!exists)
                {
                    res.statusCode=404
                    res.setHeader('Content-Type','text/html')
                    res.end(`<html><body><h1>Err 404 : ${fileUrl} Not Found  </h1></body></html>`)
                    return
                }
                else
                {
                    res.setHeader('Content-Type','text/html')
                    fs.createReadStream(filePath).pipe(res)

                }
            })
        }
        else
        {
            res.statusCode=404
            res.setHeader('Content-Type','text/html')
            res.end(`<html><body><h1>Err 404 : ${fileUrl} Not an HTML File  </h1></body></html>`)
            return  
        }
    }
    else{
        res.statusCode=404
        res.setHeader('Content-Type','text/html')
        res.end(`<html><body><h1>Err 404 : ${req.method} not Supported  </h1></body></html>`)
        return  
    }
})
server.listen(port,hostname,()=>{
    console.log(`Server Running at http://${hostname}:${port}`)
})