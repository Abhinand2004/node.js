const http=require("http")
const fs=require("fs")
const url=require("url")
const queryString=require("querystring")
const{MongoClient, ObjectId}=require("mongodb")

const {error, log}=require("console")
const { promiseHooks } = require("v8")


const clint=new MongoClient("mongodb://127.0.0.1:27017/")
const port=3001;
const app=http.createServer(async (req,res)=>{
    //createdb
    const db=clint.db("EmployeDetails")
    //collection
    const collection=db.collection("employe")
    const path=url.parse(req.url);
    console.log(path);
    if (path.pathname=="/") {
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../clientside/index.html"))
    }
    else if(path.pathname=="/css/index.css"){
        res.writeHead(200,{"Content-Type":"text/css"})
        res.end(fs.readFileSync("../clientside/css/index.css"))
    }
    else if(path.pathname=="/add"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../clientside/pages/addemployi.html"))
    }
    else if(path.pathname=="/css/addeplyee.css"){
        res.writeHead(200,{"Content-Type":"text/css"})
        res.end(fs.readFileSync("../clientside/css/addeplyee.css"))
    }
    else if(path.pathname==("/info")){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../clientside/pages/info.html"))
    }
    else if(path.pathname=="/css/info.css"){
        res.writeHead(200,{"Content-Type":"text/css"})
        res.end(fs.readFileSync("../clientside/css/info.css"))
    }
    else if(path.pathname==("/info/edit")){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../clientside/pages/employidetails.html"))
    }
    else if(path.pathname=="/css/details.css"){
        res.writeHead(200,{"Content-Type":"text/css"})
        res.end(fs.readFileSync("../clientside/css/details.css"))
    }
    else if(path.pathname=="/js/index.js"){
        res.writeHead(200,{"Content-Type":"text/js"})
        res.end(fs.readFileSync("../clientside/js/index.js"))
    }
    else if(path.pathname=="/js/info.js"){
        res.writeHead(200,{"Content-Type":"text/js"})
        res.end(fs.readFileSync("../clientside/js/info.js"))
    }
    else if(path.pathname=="/js/edit.js"){
        res.writeHead(200,{"Content-Type":"text/js"})
        res.end(fs.readFileSync("../clientside/js/edit.js"))
    }
    else if(path.pathname=="/photos/user.jpeg"){
        res.writeHead(200,{"Content-Type":"image/jpeg"})
        res.end(fs.readFileSync("../clientside/photos/user.jpeg"))
    }

    else if(path.pathname=="/submit"&&req.method=="POST"){
        let body=""
        req.on("data",(chunks)=>{
            body+=chunks.toString();
        })
        req.on("end",async()=>{
            if(body!==null){
                const formData=queryString.parse(body);
                collection.insertOne(formData).then(()=>{
                    console.log("data addaed");
                    
                }).catch((error)=>{
                    console.log(error);
                    
                })
                res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../clientside/index.html"))
            }
        })
    }
    else if(path.pathname=="/getData"&&req.method=="GET"){
        const data=await collection.find().toArray();
        const json_data=JSON.stringify(data)
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
        let body='';
        req.on('data',(chunks)=>{
            body+=chunks.toString();
        });
        req.on('end',async()=>{
            let  data =JSON.parse(body);
            let _id=new ObjectId(data.a)
            let updateData={
                id: data.id,
                name: data.name,
                designation: data.designation,
                experience: data.experience,
                salary: data.salary,
                phone: data.phone,
                email: data.email
            };
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

app.listen(port)