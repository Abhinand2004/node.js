const http=require("http")
const fs=require("fs")
const url=require("url")
const { error } = require("console")


const app=http.createServer((req,res)=>{
    let newUrl=url.parse(req.url)
    if (newUrl.pathname=="/") {
        fs.readFile("./frontend/index.html",(error,data)=>{
            if (error) {
                res.writeHead(404,{"Content-Type":"text/htnl"})
                res.end("page not found")
                
            }else{
                res.write(data);
            res.end()
            }
        })
    }
    else if (newUrl.pathname=="/about") {
        fs.readFile("./frontend/pages/about.html",(error,data)=>{
            if (error) {
                res.writeHead(404,{"Content-Type":"text/html"})
                res.end("page not found")
                
            }else{
                res.write(data);
            res.end()
            }
        })
        
    }
    else if (newUrl.pathname=="/contact") {
        fs.readFile("./frontend/pages/contact.html",(error,data)=>{
            if (error) {
                res.writeHead(404,{"Content-Type":"text/html"})
                res.end("page not found")
                
            }else{
            res.write(data);
            res.end()
            }
        })  
    }
    else{
        fs.readFile("./frontend/pages/error.html",(error,data)=>{
            if (error) {
                res.writeHead(404,{"Content-Type":"text/html"})
                res.end("page not found")
                
            }else{
            res.write(data);
            res.end()
            }
        })
    }
})

app.listen(3000)