
((d, c, f) => { 
    id=sessionStorage.getItem("id")
    lugar=sessionStorage.getItem("lugar")
    username=sessionStorage.getItem("username")
    placauser=sessionStorage.getItem("placa")
    timecountuser=new Date(sessionStorage.getItem("Time"))
    correo=sessionStorage.getItem("correo")
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
         console.log(message)
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
})(document, console.log, firebase);      
//https://www.smtpjs.com/