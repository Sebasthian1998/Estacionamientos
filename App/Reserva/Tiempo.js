
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
    f.initializeApp(firebaseConfig);
    const db = f.database()
    EstacionarRef = db.ref().child('Estacionamientos')
    let id=sessionStorage.getItem("id") //Lugar ID,
    lugar=sessionStorage.getItem("lugar"),
    username=sessionStorage.getItem("username"),
    placauser=sessionStorage.getItem("placa"),
    timecountuser=new Date(sessionStorage.getItem("Time")),
    correo=sessionStorage.getItem("correo"),
    countdown(timecountuser,'clock')
    
    function sendEmail(){
        Email.send({
            Host : "smtp25.elasticemail.com",
            Username : "sebasthian.ampuero@unmsm.edu.pe",
            Password : "c9b38006-7495-422b-90b8-e818475b9336",
            To : correo,
            From : "sebasthian.ampuero@unmsm.edu.pe",
            Subject : "Realizando Pruebas",
            Body : "Le faltan 2 minutos para que acabe el tiempo de reserva"
        }).then(
          message => {//alert(message)
         console.log(correo)
        }
        );
    }
       function countdown (deadline,elem){//Funcion para dibujar las fechas
        const el = document.getElementById(elem);
        
        const timerUpdate = setInterval( () => {
          let t = getRemainingTime(deadline);
          el.innerHTML = `${t.remainHours}h:${t.remainMinutes}m:${t.remainSeconds}s`;
          if(t.remainMinutes==2 && t.remainSeconds==0){
            c('Se cabo el tiempo')
              sendEmail()
          }
          if(t.remainTime <= 1) {
            clearInterval(timerUpdate);
            //el.innerHTML = finalMessage;
            getData()
            sessionStorage.setItem("Time",timecountuser-1)
          }
        }, 1000)
      };
      const getRemainingTime = deadline => {//Funcion para obtener la resta delas fechas
        c(deadline)
         let now = new Date(),
             remainTime = (deadline - now + 1000) / 1000,
             remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
             remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
             remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2)
           //c(remainTime)
         return {
           remainSeconds,
           remainMinutes,
           remainHours,
           remainTime
         }
       };

       function updateInDB(cantidad) {
        cantidad=cantidad+1
        const EstacionamientoRef = db.ref(),
          actualizacion2={
              Cantidad:cantidad
          }
          updates={}
          updates[`Estacionamientos/Estacionamiento18/CantidadActual`]=actualizacion2
         EstacionamientoRef.update( 
           updates
         )           
      }
      function getData(){
        EstacionarRef.orderByChild('ID').equalTo(id).on('child_added',data=>{
            valores= data.val(),
            cantidad=valores.CantidadActual.Cantidad
            updateInDB(cantidad)
        })}
})(document, console.log, firebase);      
//https://www.smtpjs.com/