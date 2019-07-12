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
    auth = f.auth(),
    usersRef = db.ref().child('user'),
    placasid=d.getElementById('placas'),
    Registerbtn=d.getElementById('Registerbtn'),
    userId = d.getElementById('id'),
    userName=d.getElementById('name'),
    userEmail=d.getElementById('email'),
    userSurname=d.getElementById('surname'),
    userDni=d.getElementById('dni'),
    userPass=d.getElementById('password')
    if(Registerbtn){
        //Boton para registrar
        Registerbtn.addEventListener('submit',e=>{
            e.preventDefault()
            agregados=[...d.querySelectorAll('.agregados')]//Transformar en array, el json que me trae firebase
            validate=validatedata(userDni.value)
            if(!validate){
              return
            }
            let jsonplacas=[]
            //c(agregados[0].value)
            for(let i=0; i<agregados.length;i++){
              if(validateplaca(agregados[i].value)){
                jsonplacas.push({"Placa":agregados[i].value}) //para insertar dinamicamente datos en el json
              }else return
         
            }
            //c(jsonplacas)
            auth.createUserWithEmailAndPassword( //Metodo propio de firebase
                userEmail.value, //e.target valor que origina el evento
                userPass.value //Esto es una promesa
              ).then(res => {
                c(res)
                c(res.user)
                sessionStorage.setItem("username", userName.value);
                //Insertar el usuario en la BD
                createUserInDB(
                  res.user.uid, //Que queremos almacenar del usuario que estamos registrando, ese es el id unico que genera firebase
                  userName.value,
                  userEmail.value,
                  userSurname.value,
                  userDni.value,
                  jsonplacas
                )
                window.location='login.html'
              })
              .catch(err => {//Capturamos el error, tiene mas opciones
                c(err)
                alert('El email ingresado ya existe, ingrese otro email')
                
                //message.innerHTML = `<p class="error">La cuenta de correo <b>${e.target.email.value}</b> ya existe. Intenta con otra.</p>`
                //e.target.name.focus() //Poner el foco de pagina en ese 
              })
        })
    }
    placadiv.addEventListener('click', e=>{
      placadiv.addEventListener('click',e=>{
        c(e)
        paintplacas()
      })     
    })
    function validatedata(dni){
      
      var ex_regular_dni; 
      ex_regular_dni = /^\d{8}$/;
      c(ex_regular_dni.test(dni))
      if(ex_regular_dni.test(dni) == true){
          return true //Trae correcto
      }else{
       alert('Dni erroneo, formato no válido');

          return false
      }
    }
    function validateplaca(placa){
      let digitos=placa.length,
      patron=/^[A-Z0-9]{6}$/;
      if(patron.test(placa)==false){
        alert('Placas incorrectas')
        return false
      }else return true
      
    }

    function createUserInDB(uid, name, email,surname,dni,placas) { //Funcion que se invoca mas abajo, para poder insertar en la base de datos
        let usersRef = f.database().ref().child('users')
        usersRef.child(uid).set({ //El primer parametro sera para que se cree con ese ID unico
          name, //Si los parametros se llaman igual a lo que se quiere almacenar en el objeto json se deja asi
          email,
          surname,
          dni,
          placas
        })
      }
    function paintplacas(){
        placaid=parseInt(d.getElementById('placa').value)
        if(placasid.innerHTML==''){
            for(let i=0; i<placaid ;i++){
            let li=d.createElement('span')
            li.innerHTML=`
            <input name="agregados" class="agregados" required placeholder="IngresePlaca">`
            placasid.appendChild(li)
            }
        }
        else{
            while(placasid.firstChild){
                placasid.removeChild(placasid.firstChild);
              }
            }
    }

})(document,console.log,firebase)
