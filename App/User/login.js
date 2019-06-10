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
     Loginbtn=d.getElementById('Loginbtn')
    if(Loginbtn){
        Loginbtn.addEventListener('submit',e=>{
            e.preventDefault()
            c(e.target.email)
            auth.signInWithEmailAndPassword(
                e.target.email.value,
                e.target.password.value
              )
                .then(user => {
                  c(user)
                  //window.location='../Maps/index.html'
                 // e.target.reset()
                })
                .catch(err => {
                  c(err)
                  e.target.password.focus()
                })  
        })
    }
    
})(document,console.log,firebase)

