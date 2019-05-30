;

    lugar=sessionStorage.getItem("lugar")
    id=sessionStorage.getItem("id")
    console.log(lugar)
    console.log(id)
    Name.innerHTML=`<span>${lugar}</span>`

;
((d, c, f) => { 
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
//Primeros Pasos https://firebase.google.com/docs/database/web/start

const db = f.database(), //Definiendo elementos de la BD
 EstacionarRef = db.ref().child('Estacionamientos'), //Llama la instancia de la BD, lo llamamos contacts
 contacts = d.getElementById('cupos')
 c(EstacionarRef)

//READ
let cantidadactual
EstacionarRef.on('child_added', data => {  //On metodo de firebase, child_added,changed y removed son propios de firebase
 let valor=data.val()
 //c(valor.ID)
 
  if(valor.ID==id){
    cantidadactual=valor.CantidadActual

    Reservabtn.addEventListener('click',e=>{
      e.preventDefault()
      Reservar(cantidadactual)
      contacts.innerHTML=dibujar(valor.Name,cantidadactual)
    })
    Salidabtn.addEventListener('click',e=>{
      e.preventDefault()
      salida(cantidadactual,valor.Reservas)
      contacts.innerHTML=dibujar(valor.Name,cantidadactual)
    })
    //li.innerHTML=`<span>${valor.Name} con ${cantidadactual} reservas</span>`
    contacts.innerHTML=dibujar(valor.Name,cantidadactual)
    contacts.appendChild(li)//Aca en el span lo dibujamos
  }
})

EstacionarRef.on('child_changed', data => {//Trae el elemento modificado de firebase
 let affectedNode = d.getElementById(data.key) //Buscar el elemento que tiene por ID lo que cambio
})

EstacionarRef.on('child_removed', data => {
 let affectedNode = d.getElementById(data.key)
 contacts.removeChild(affectedNode)
})
function dibujar(nombre,cantidad){
  li=`<span>${nombre} con ${cantidad} reservas</span>`
  return li
}

function salida(cantidad,cantidadMax){
  if(cantidad<cantidadMax){
    cantidadactual=cantidadactual+1
  }
  else{
    return
  }
}

function Reservar(cantidad){
  if(cantidad>0){
    cantidadactual=cantidadactual-1
    c(cantidadactual,'cantidadactual')
  }
  else{
    return
  }
}

})(document, console.log, firebase);

 /*
//CREATE
contactsForm.addEventListener('submit', e => {
 e.preventDefault() //Para que no se ejecute inmediatamente el submit
 //alert('Procesando form')

 let id = contactId.value || EstacionarRef.push().key,//Campo oculto en form, key para una insercion a eseobjeto y obtener la llave
   contactData = {
     name: contactName.value,
     email: contactEmail.value
   },
   updateData = {}

 updateData[`/${id}`] = contactData //Para que siga esa ruta de la bd en real tume

 EstacionarRef.update(updateData) //Actualizar la referencia del nuevo elemento

 contactId.value = ''
 contactsForm.reset() //Resetear el formulario
})
*/