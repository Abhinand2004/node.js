

async function getdonors() {
    const res=await fetch("http://localhost:3000/getdonors")
    const data =await res.json()
    console.log(data);
    str=``
    data.map((Datas)=>{
        str+=`
        <div class="content">
        <input type="text"  id="name-${Datas._id}" disabled=true value="${Datas.name}">
    <input type="text" id="email-${Datas._id}" disabled=true value="${Datas.email}"> 
    <input type="text" id="phone-${Datas._id}" disabled=true value="${Datas.phone}">
    <input type="text" id="bgroup-${Datas._id}" disabled=true value="${Datas.bgroup}">
    <input type="text" id="gender-${Datas._id}" disabled=true value="${Datas.gender}">
   <div class="buttons">
    <div class="edit"><button class="btn1 " onclick="edit('${Datas._id}')" >Edit</button></div>
    <div class="save"><button class="btn2" onclick="save('${Datas._id}')">save</button></div>
    <div class="delete"><button class="btn3" onclick="delet('${Datas._id}')">delete</button></div>
   </div>
   </div>
        `
    })
    
document.getElementById("datas").innerHTML=str
}
getdonors()





function edit(id){
document.getElementById(`name-${id}`).disabled=false
document.getElementById(`email-${id}`).disabled=false
document.getElementById(`phone-${id}`).disabled=false
document.getElementById(`bgroup-${id}`).disabled=false
document.getElementById(`gender-${id}`).disabled=false


}



async function delet(id) {
    let res=await fetch("http://localhost:3000/delet",{
        method:"DELETE",    
        headers:{"Content-Type":"text/plain"},
        body:id
    })
    if(res.status==200){
        console.log("khguyg");
        
        getdonors()
    }
    else{
        alert("failed")
    }
}




async function save(id) {
console.log(id);
const name=document.getElementById(`name-${id}`).value;
const email=document.getElementById(`email-${id}`).value;
const phone=document.getElementById(`phone-${id}`).value;
const bgroup=document.getElementById(`bgroup-${id}`).value;
const gender=document.getElementById(`gender-${id}`).value;
console.log(name,gender);
const data={id,name,email,phone,gender,bgroup}
const res=await fetch("http://localhost:3000/update",{
    method:"PUT",
    headers:{"Content-Type":"text/json"},
    body:JSON.stringify(data)
})
if (res.status==200) {
    getdonors()
}else{
    alert("faild")
}
}