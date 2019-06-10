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
        Registerbtn.addEventListener('click',e=>{
            e.preventDefault()
            c(userEmail.value)
            auth.createUserWithEmailAndPassword( //Metodo propio de firebase
                userEmail.value, //e.target valor que origina el evento
                userPass.value //Esto es una promesa
              ).then(res => {
                c(res)
                c(res.user)
                //Insertar el usuario en la BD
                createUserInDB(
                  res.user.uid, //Que queremos almacenar del usuario que estamos registrando, ese es el id unico que genera firebase
                  userName.value,
                  userEmail.value,
                  userSurname.value,
                  userDni.value
                )
              })
              .catch(err => {//Capturamos el error, tiene mas opciones
                c(err)
                //message.innerHTML = `<p class="error">La cuenta de correo <b>${e.target.email.value}</b> ya existe. Intenta con otra.</p>`
                e.target.name.focus() //Poner el foco de pagina en ese 
              })


            /*
            let id = userId.value || usersRef.push().key,//Campo oculto en form, key para una insercion a eseobjeto y obtener la llave
            userData = {
            name: userName.value,
            email: userEmail.value,
            dni: userDni.value,
            surname: userSurname.value,
            password: userPass.value
          },
          updateData = {}
            updateData[`/${id}`] = userData //Para que siga esa ruta de la bd en real tume
            usersRef.update(updateData) //Actualizar la referencia del nuevo elemento
            userId.value = ''  */ 
           //   window.location='../Maps/index.html'
        })
    }
    placadiv.addEventListener('click', e=>{
         paintplacas()
    })
    function createUserInDB(uid, name, email,surname,dni) { //Funcion que se invoca mas abajo, para poder insertar en la base de datos
        let usersRef = f.database().ref().child('users')
        usersRef.child(uid).set({ //El primer parametro sera para que se cree con ese ID unico
          name, //Si los parametros se llaman igual a lo que se quiere almacenar en el objeto json se deja asi
          email,
          surname,
          dni
        })
      }
    function paintplacas(){
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

})(document,console.log,firebase)
