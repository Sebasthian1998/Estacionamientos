;
((d,c)=>{
    placasid=d.getElementById('placas')
    c(placasid)
    let Registerbtn=d.getElementById('Registerbtn')
    let insertplaca=false
    if(Registerbtn){
        Registerbtn.addEventListener('click',e=>{
            e.preventDefault()
            
           //    window.location='../Maps/index.html'
        })
    }
    placadiv.addEventListener('click', e=>{
        let valor=insertplaca
         paintplacas(valor)
         insertplaca=true
    })

    function paintplacas(valor){
        placaid=parseInt(d.getElementById('placa').value)
        if(placasid.innerHTML==''){
            for(let i=0; i<placaid ;i++){
            let li=d.createElement('span')
            li.innerHTML=`
            <input class="agregados" value="" placeholder="IngresePlaca">`
            placasid.appendChild(li)
            }
        }
        else{
            while(placasid.firstChild){
                placasid.removeChild(placasid.firstChild);
              }
            }
        
    }
})(document,console.log)
