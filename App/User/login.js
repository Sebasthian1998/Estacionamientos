;
((d,c)=>{
    let Loginbtn=d.getElementById('Loginbtn')
    if(Loginbtn){
        Loginbtn.addEventListener('click',e=>{
            e.preventDefault()
            window.location='../Maps/index.html'
        })
    }
    
})(document,console.log)

