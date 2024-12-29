


async function getEmploye() {
    const res=await fetch("http://localhost:3001/getData")
    const data=await res.json()
    console.log(data);

    str=``
   data.map((data,index)=>{
    
    str+=`
    
    <div class="card">
          <div class="imagediv">
<img src="../photos/user.jpeg" alt="">

          </div>
          <div class="bottom">
              <div class="id">id:${data.id}</div>
              <div class="name">name:${data.name}</div>
              <div class="Desig">designation:${data.designation}</div>
          <div class="btn"><a href="http://localhost:3001/info?id=${index}"><button>INFO</button></a></div>
          </div>
      </div>
  `
   })
    
   document.getElementById("mainside").innerHTML=str
}

getEmploye()