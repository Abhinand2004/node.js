const http=require("http")
const fs=require("fs")
const url =require("url")
const queryString=require("querystring")
const{MongoClient, ObjectId}=require("mongodb")
const { error } = require("console")


const clint=new MongoClient("mongodb://127.0.0.1:27017/")
const Port=3000;
const app=http.createServer(async(req,res)=>{

    //create database
    const db=clint.db("DONOR")
    //createcollection
    const collection=db.collection("bloodbank")
    const path=url.parse(req.url);
    console.log(path);
    if (path.pathname=="/") {
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../clintside/index.html"))
    }
    
    else if (path.pathname=="/css/index.css") {
        res.writeHead(200,{"Content-Type":"text/css"});
        res.end(fs.readFileSync("../clintside/css/index.css"))
    }
   
    
    
    
    else if (path.pathname=="/add") {
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../clintside/pages/add.html"))
    }

     
    else if (path.pathname=="/css/add.css") {
        res.writeHead(200,{"Content-Type":"text/css"});
        res.end(fs.readFileSync("../clintside/css/add.css"))
    }
    else if (path.pathname=="/js/custom.js") {
        res.writeHead(200,{"Content-Type":"text/js"});
        res.end(fs.readFileSync("../clintside/js/custom.js"))
    }

    if (path.pathname=="/submit"&&req.method=="POST") {
        console.log("hai");
        let body=""
        req.on("data",(chunks)=>{
            console.log(chunks);
            body+=chunks.toString();
            console.log(body);
            
            
        })
        req.on("end",async()=>{
            if (body!==null) {
                const formData=queryString.parse(body);
                console.log(formData);
                collection.insertOne(formData).then(()=>{
                    console.log("data added");
                    
                }).catch((error)=>{
                    console.log(error);
                    
                })
                res.writeHead(200,{"Content-Type":"text/html"});
                res.end(fs.readFileSync("../clintside/index.html"))
            }
        })
        
    }
    if (path.pathname=="/getdonors"&&req.method=="GET") {
        const data=await collection.find().toArray();
        const json_data=JSON.stringify(data)
        console.log(json_data);
        res.writeHead(200,{"Content-Type":"text/json"})
        res.end(json_data)        
    }


    else if(path.pathname=="/delet"&&req.method=="DELETE"){
        console.log(">>>>>>>>>>>>>>>>>>>>>>");
        let body=""
        req.on('data',(chunks)=>{
            body+=chunks.toString();
            console.log(body);
            
        });
        req.on('end',async()=>{
            let _id=new ObjectId(body)
            console.log(_id);
            await collection.deleteOne({_id}).then(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"})
                res.end("success")


            }).catch(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"})
                res.end("Fail")
            })
            
        })
        
    }
    else if(path.pathname=="/update"&&req.method=="PUT"){   
        let body="";
        req.on('data',(chunks)=>{
            body+=chunks.toString();
        });
        req.on('end',async()=>{
            let  data =JSON.parse(body);
            let _id=new ObjectId(data.id)
            let updateData={name:data.name,email:data.email,phone:data.phone,bgroup:data.bgroup,gender:data.gender}
            
            await collection.updateOne({_id},{$set:updateData}).then(()=>{
            console.log("updateSuccess");

                res.writeHead(200,{"Content-Type":"text/plain"})

                res.end("success")
            }).catch((error)=>{
                console.log(error);
                
                res.writeHead(404,{"Content-Type":"text/plain"})
                res.end("fail")
            })
        })
    }
    
})

app.listen(Port)



