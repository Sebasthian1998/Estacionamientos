;
((d)=>{
    let Loginbtn=d.getElementById('Loginbtn')
    let Registerbtn=d.getElementById('Registerbtn')
    if(Loginbtn){
        Loginbtn.addEventListener('click',e=>{
            e.preventDefault()
            window.location='../Maps/index.html'
        })
    }
    
    if(Registerbtn){
        Registerbtn.addEventListener('click',e=>{
            e.preventDefault()
            window.location='../Maps/index.html'
        })
    }
})(document)

