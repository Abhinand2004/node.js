const http=require("http")
const fs=require("fs")
const url=require("url")
const { error } = require("console")

const app=http.createServer((req,res)=>{
    let newUrl=url.parse(req.url)
    if(newUrl.pathname=="/"){
        fs.readFile("./frontend/index.html",(error,data)=>{
            if(error){
                res.writeHead(404,{"Content-Type":"text/html"})
                return res.end("Page not found")
            }
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(data)
            res.end()
        })
    }
    else if(newUrl.pathname=="/about"){
        fs.readFile("./frontend/pages/about.html",(error,data)=>{
            if(error){
                res.writeHead(404,{"Content-Type":"text/html"})
                return res.end("Page not found")
            }
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(data)
            res.end()
        })
    }
    else if(newUrl.pathname=="/contact"){
        fs.readFile("./frontend/pages/contact.html",(error,data)=>{
            if(error){
                res.writeHead(404,{"Content-Type":"text/html"})
                return res.end("Page not found")
            }
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(data)
            res.end()
        })
    }
    else if(newUrl.pathname=="/login"){
        fs.readFile("./frontend/pages/login.html",(error,data)=>{
            if(error){
                res.writeHead(404,{"Content-Type":"text/html"})
                return res.end("Page not found")
            }
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(data)
            res.end()
        })
    }
    else if(newUrl.pathname=="/service"){
        fs.readFile("./frontend/pages/service.html",(error,data)=>{
            if(error){
                res.writeHead(404,{"Content-Type":"text/html"})
                return res.end("Page not found")
            }
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(data)
            res.end()
        })
    }
    else{
        fs.readFile("./frontend/pages/error.html",(error,data)=>{
            if(error){
                res.writeHead(404,{"Content-Type":"text/html"})
                return res.end("Page not found")
            }
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(data)
            res.end()
        })
    }
})
app.listen(4000)
