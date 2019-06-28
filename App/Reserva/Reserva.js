//import {firebaseConfig} from '../Firebase/firebase';
((d, c, f) => { 
    id=sessionStorage.getItem("id")
    lugar=sessionStorage.getItem("lugar")
    username=sessionStorage.getItem("username")
    placauser=sessionStorage.getItem("placa")
    usernameid.innerHTML=`<span>${username}</span>`
    //console.log(lugar)
    console.log(id)
    Name.innerHTML=`<span>${lugar}, ${placauser}</span>`
      
      var firebaseConfig = {
      apiKey: "AIzaSyBhIXl4RhU_cyV-wimje4RDfZwky7yBFYQ",
      authDomain: "estacionamientos-790ec.firebaseapp.com",
      databaseURL: "https://estacionamientos-790ec.firebaseio.com",
      projectId: "estacionamientos-790ec",
      storageBucket: "estacionamientos-790ec.appspot.com",
      messagingSenderId: "975720178000",
      appId: "1:975720178000:web:29fb7a9d2c9ec7d3",
      };
        
// Initialize Firebase
f.initializeApp(firebaseConfig);

const db = f.database(), //Definiendo elementos de la BD
 EstacionarRef = db.ref().child('Estacionamientos'), //Llama la instancia de la BD, lo llamamos contacts
 contacts = d.getElementById('cupos')
 c(EstacionarRef)

//READ
let cantidadactual

EstacionarRef.orderByChild('ID').equalTo(id).on('child_added',data=>{
     let valor=data.val(),
     key=data.key,
    cantidadactual=valor.CantidadActual
    c(cantidadactual)
   
    Reservabtn.addEventListener('click',e=>{
      e.preventDefault()
      if(timeminutes.value<30){//Validacion, va aca sino el return solo estara al scope del timeuser
         alert('Ingrese una cantidad valida de minutos')
         timeminutes.value=''
         return
      }
      timeuser()
      Reservar(key,valor.ID,cantidadactual,valor.Name,valor.Reservas)
      contacts.innerHTML=dibujar(cantidadactual) //se supone dibuja, con el nuevo ya no haria eso
      Reservabtn.style.display='none'
      window.location='Tiempo.html'
    })
    Salidabtn.addEventListener('click',e=>{
      e.preventDefault()
      salida(key,valor.ID,cantidadactual,valor.Name,valor.Reservas)
      contacts.innerHTML=dibujar(cantidadactual)
    })
    contacts.innerHTML=dibujar(cantidadactual)
})

EstacionarRef.orderByChild('ID').equalTo(id).on('child_changed', data => {//Trae el elemento modificado de firebase
  
 //Buscar el elemento que tiene por ID lo que cambio
})
EstacionarRef.on('child_removed', data => {
 let affectedNode = d.getElementById(data.key)
 contacts.removeChild(affectedNode)
})


function transformminutes(time){//Funcion para transformar los minutos
  let hour=0,
      minutes=0
  if(time>=60){
    hour=Math.floor(time/60)
    minutes=time-hour*60
  }
  else minutes=time-0//Para poder transformar time a number
  return {hour,minutes}
}

function timeuser(){
  let now=new Date()
  
  timeline=transformminutes(timeminutes.value) //Valor ingresado por el usuario
  c(now.getMinutes())
  c(timeline.hour,timeline.minutes)
  let deadline=new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours()+timeline.hour,now.getMinutes()+timeline.minutes,0)
  sessionStorage.setItem("sessiondeadline", deadline); 
  sessiondead=new Date(sessionStorage.getItem("sessiondeadline")) //Para transformar a date este objeto, necesaria esta linea
  c(sessiondead,"HOLA")
  sessionStorage.setItem("Time",sessiondead)//Para poder trabajar con la hora final calculada en el otro archivo
}

function dibujar(cantidad){
  li=`<span>${cantidad} reservas</span>`
  return li
}

function salida(key,uid,cantidad,Name,cantidadMax){

  if(cantidad<cantidadMax){
    cantidad=cantidad+1
    updateInDB(key,uid,cantidad,Name,cantidadMax) 
  }
  else{
    return
  }
}

function Reservar(key,uid,cantidad,Name,cantidadMax){
  if(cantidad>0){
    c(cantidad)
    cantidad=cantidad-1
    c(cantidad,'cantidadactual')
    updateInDB(key,uid,cantidad,Name,cantidadMax)
  }
  else{
    return
  }
}
function updateInDB(key,uid,actual,Name,cantidadMax) { //Funcion que se invoca mas abajo, para poder insertar en la base de datos
      c(uid,actual,Name,cantidadMax)
       const EstacionarRef = db.ref(),
         actualizacion={
          CantidadActual:actual,
          ID:uid,
          Name:Name,
          Reservas:cantidadMax
         },
         updates={}
         updates['Estacionamientos/'+key]=actualizacion
        EstacionarRef.update( //El primer parametro sera para que se cree con ese ID unico
          updates
        )
        //location.reload()

}
})(document, console.log, firebase);


