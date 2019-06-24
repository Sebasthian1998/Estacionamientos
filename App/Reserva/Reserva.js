//import {firebaseConfig} from '../Firebase/firebase';
((d, c, f) => { 

    id=sessionStorage.getItem("id")
    lugar=sessionStorage.getItem("lugar")
     
    //console.log(lugar)
    console.log(id)
    Name.innerHTML=`<span>${lugar}</span>`
      
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
    c(key)
   
    Reservabtn.addEventListener('click',e=>{
      e.preventDefault()
      Reservar(key,valor.ID,cantidadactual,valor.Name,valor.Reservas)
      contacts.innerHTML=dibujar(cantidadactual)
      timeuser()
      Reservabtn.style.display='none'
    })
    Salidabtn.addEventListener('click',e=>{
      e.preventDefault()
      salida(key,valor.ID,cantidadactual,valor.Name,valor.Reservas)
      contacts.innerHTML=dibujar(cantidadactual)
    })
    //li.innerHTML=`<span>${valor.Name} con ${cantidadactual} reservas</span>`
    contacts.innerHTML=dibujar(cantidadactual)
    //contacts.appendChild(li)//Aca en el span lo dibujamos
})

EstacionarRef.orderByChild('ID').equalTo(id).on('child_changed', data => {//Trae el elemento modificado de firebase
  
 //Buscar el elemento que tiene por ID lo que cambio
})
EstacionarRef.on('child_removed', data => {
 let affectedNode = d.getElementById(data.key)
 contacts.removeChild(affectedNode)
})

const getRemainingTime = deadline => {//Funcion para obtener la resta delas fechas
 c(deadline)
  let now = new Date(),
      remainTime = (deadline - now + 1000) / 1000,
      remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
      remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
      remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2)
    c(remainTime)
  return {
    remainSeconds,
    remainMinutes,
    remainHours,
    remainTime
  }
};

const countdown = (deadline,elem,finalMessage) => {//Funcion para dibujar las fechas
  const el = document.getElementById(elem);
  
  const timerUpdate = setInterval( () => {
    let t = getRemainingTime(deadline);
    el.innerHTML = `${t.remainHours}h:${t.remainMinutes}m:${t.remainSeconds}s`;
    if(t.remainTime <= 1) {
      clearInterval(timerUpdate);
      el.innerHTML = finalMessage;
    }
  }, 1000)
};

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
  timeline=transformminutes(timeminutes.value)
  c(now.getMinutes())
  c(timeline.hour,timeline.minutes)
  let deadline=new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours()+timeline.hour,now.getMinutes()+timeline.minutes,0)
  sessionStorage.setItem("sessiondeadline", deadline); 
  sessiondead=new Date(sessionStorage.getItem("sessiondeadline")) //Para transformar a date este objeto, necesaria esta linea
  c(sessiondead,"HOLA")
  countdown(sessiondead, 'clock', '¡Ya empezó!');//En ves de ya empezo va la funcion cuando acabe tiempo
  clocktime.style.display='none'
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
  const EstacionarRef = db.ref().child('Estacionamientos')
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


