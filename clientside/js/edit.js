let url=window.location.href;
let urlparams=new URLSearchParams(url.split("?")[1])
let id=urlparams.get("id")



async function editemployi() {
    const res=await fetch(`http://localhost:3001/getData`)
    const data=await res.json()
    datas=data[id]
    console.log(id);
    
    
str=``

str+=
    `
    <div class="card">
<div class="lside">
   <img src="../photos/user.jpeg" alt="">

</div>
<div class="rside">
    <input type="text"  placeholder="id" value="${datas.id}" id="id">
    <input type="text"  placeholder="name"  value="${datas.name}" id="name">
    <input type="text"  placeholder="designation"   value="${datas.designation}" id="designation">
    <input type="text"  placeholder="salary"  value="${datas.salary}" id="salary">

    <input type="text"  placeholder="experience" value="${datas.experience}" id="experience">
    <input type="text"  placeholder="phone"  value="${datas.phone}" id="phone">
    <input type="text"  placeholder="EMAIL"  value="${datas.email}" id="email">
    <button onclick="save('${datas._id}')">SAVE</button>
</div>
</div>
    
    
    `
document.getElementById("mainside").innerHTML=str

}


async function save(a) {
    console.log(a);
    
    const id=document.getElementById(`id`).value;
    
    const name=document.getElementById(`name`).value;
    const designation=document.getElementById(`designation`).value;
    const salary=document.getElementById(`salary`).value;
    const experience=document.getElementById(`experience`).value;
    const phone=document.getElementById(`phone`).value;
    const email=document.getElementById(`email`).value;





    
    console.log(name,designation,salary,experience,phone,email);
    const data = { a,id, name, designation, salary, experience, phone, email,};

    const res=await fetch(`http://localhost:3001/update`,{
        method:"PUT",
        headers:{"Content-Type":"text/json"},
        body:JSON.stringify(data)
    })
    
    if (res.status==200) {
        editemployi()
        window.location.href="http://localhost:3001/"   

    }else{
        alert("faild")
    }
    
    }





editemployi()