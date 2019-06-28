
((d, c, f) => { 
    id=sessionStorage.getItem("id")
    lugar=sessionStorage.getItem("lugar")
    username=sessionStorage.getItem("username")
    placauser=sessionStorage.getItem("placa")
    timecountuser=new Date(sessionStorage.getItem("Time"))
    
    countdown(timecountuser,'clock','Finalizao')
       
       function countdown (deadline,elem,finalMessage){//Funcion para dibujar las fechas
        const el = document.getElementById(elem);
        
        const timerUpdate = setInterval( () => {
          let t = getRemainingTime(deadline);
          el.innerHTML = `${t.remainHours}h:${t.remainMinutes}m:${t.remainSeconds}s`;
          if(t.remainTime <= 1) {
            clearInterval(timerUpdate);
            el.innerHTML = finalMessage;
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
           c(remainTime)
         return {
           remainSeconds,
           remainMinutes,
           remainHours,
           remainTime
         }
       };
})(document, console.log, firebase);      