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
            c(e.target.email)
            auth.signInWithEmailAndPassword(
                e.target.email.value,
                e.target.password.value
              )
                .then(user => {
                  dibujarplaca(e.target.email.value)
                  //c(user)
                  //window.location='../Maps/index.html'
                 // e.target.reset()
                })
                .catch(err => {
                  c(err)
                  e.target.password.focus()
                })  
        })
    }
    function dibujarplaca(email){
    userRef.orderByChild('email').equalTo(email).on('value',data=>{
                
      c(data.val())
    })}

    userRef.on('child_added', data => {  //On metodo de firebase, child_added,changed y removed son propios de firebase
      
      let li = d.createElement('span')

      li.id = data.key//Obtenemos esa llave de firebaes, y le ponemos ese id en el html
      li.innerHTML = contactTemplate(data.val()) //Tra
      placasdiv.appendChild(li)//Aca en el Li lo dibujamos
    })

    function contactTemplate({ dni, email,name,placas,surname }) { //Lo que le pasa es un objeto
      c(placas)
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
      
    }
    
})(document,console.log,firebase)

