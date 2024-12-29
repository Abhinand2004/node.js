
let url=window.location.href;
let urlparams=new URLSearchParams(url.split("?")[1])
let id=urlparams.get("id")



async function getEmploye() {
    const res=await fetch(`http://localhost:3001/getData`)
    const data=await res.json()
    datas=data[id]
    console.log(id);
    
    
str=``

str+=
    `
     <div class="details">
        <div class="leftside">
            <img src="../photos/user.jpeg" alt="">
        </div>
        <div class="rightside">
            <div class="emolyiid"><h3>${datas.id}</h3></div>
            <div class="name"><h3>${datas.name}</h3></div>
            <div class="designation"><h3>${datas.designation}</h3></div>
            <div class="experience"><h3>${datas.experience}</h3></div>
            <div class="salary"><h3>${datas.salary}</h3></div>
            <div class="email"><h3>${datas.email}</h3></div>
            <div class="phonenumber"><h3>${datas.phone}</h3></div>
            <div class="btn"><Button><a href="http://localhost:3001/info/edit?id=${id}">Edit</a></Button><button onclick="dlt('${datas._id}')">Delete</button><button>Back</button></div>
        </div>
    </div>
    
    
    `
document.getElementById("main").innerHTML=str

}

async function dlt(id) {
    x=confirm("Do You Want To Delete")
    if (x) {
        let res=await fetch("http://localhost:3001/delet",{
            method:"DELETE",    
            headers:{"Content-Type":"text/plain"},
            body:id
        })
        if(res.status==200){
            console.log("khguyg");
         window.location.href="http://localhost:3001/"   
        getEmploye()
        }
        else{
            alert("failed")
        }
    }
   
}



getEmploye()

