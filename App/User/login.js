;
((d,c,f)=>{
    var firebaseConfig = {
        apiKey: "AIzaSyBhIXl4RhU_cyV-wimje4RDfZwky7yBFYQ",
        authDomain: "estacionamientos-790ec.firebaseapp.com",
        databaseURL: "https://estacionamientos-790ec.firebaseio.com",
        projectId: "estacionamientos-790ec",
        storageBucket: "estacionamientos-790ec.appspot.com",
        messagingSenderId: "975720178000",
        appId: "1:975720178000:web:29fb7a9d2c9ec7d3",
        };
        f.initializeApp(firebaseConfig);

    const db = f.database(),
    userRef=db.ref().child('users'),
     auth = f.auth(),
     Loginbtn=d.getElementById('Loginbtn'),
     placasdiv=d.getElementById('placas'),
     email=d.getElementById('email')
    if(Loginbtn){
        Loginbtn.addEventListener('submit',e=>{
            e.preventDefault()
            //c(e.target.email)
            auth.signInWithEmailAndPassword(
                e.target.email.value,
                e.target.password.value
              )
                .then(user => {
                  dibujarplaca(e.target.email.value)
                  habilitar()
                })
                .catch(err => {
                  c(err)
                  e.target.password.focus()
                })  
        })
    }
  //https://firebase.google.com/docs/database/web/lists-of-data?authuser=0  Docunmentacion de estas funciones
  
    function dibujarplaca(email){
    userRef.orderByChild('email').equalTo(email).on('child_added',data=>{
      select=d.createElement('select')
      //a=placaTemplate(data.val(),select,placasdiv) //Tra
      //c(a)
      placaTemplate(data.val(),select,placasdiv) 
    })}

    function habilitar(){
      document.getElementById("Ingresarbtn").disabled = false
      document.getElementById("Validarbtn").disabled = true
      Ingresarbtn.addEventListener('click',e=>{
        e.preventDefault
        window.location='../Maps/index.html'
      })
    }
   
    function placaTemplate({placas},select,placasdiv) { //Lo que le pasa es un objeto
      if(placas){
        let agregados=new Array(placas.length)
        let span=new Array(placas.length)
        let message=d.createElement('span')
        let messagecontent
        messagecontent=`<p>Seleccione la placa con la que desea ingresar</p>`
        message.innerHTML=messagecontent
        for(let i=0;i<placas.length;i++){
          span[i]=d.createElement('option')
          agregados[i]=`<span value=${placas[i].Placa} class="agregados">${placas[i].Placa}</span>`
          c(agregados[i])
          span[i].innerHTML=agregados[i]
          select.appendChild(span[i])
        }
        placasdiv.appendChild(message)
        placasdiv.appendChild(select)
        return placasdiv
      }
      
    }
    
})(document,console.log,firebase)

 /*
    userRef.on('child_added', data => {  //On metodo de firebase, child_added,changed y removed son propios de firebase
      
      let li = d.createElement('span')

      li.id = data.key//Obtenemos esa llave de firebaes, y le ponemos ese id en el html
      li.innerHTML = contactTemplate(data.val()) //Tra
      placasdiv.appendChild(li)//Aca en el Li lo dibujamos
    })
*/
  /*
      return `
        <span class="name">${name}</span>
        -
        <span class="email">${email}</span>
        -
        <span class="email">${surname}</span>
        -
        <span class="email">${dni}</span>
        -
        <span class="email">${placas}</span>
      `
      */
