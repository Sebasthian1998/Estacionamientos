
 let map
 let infowindow
 let lugar 
 
 function initMap()
 {
 // Creamos un mapa con las coordenadas actuales
   navigator.geolocation.getCurrentPosition(function(pos) {

   lat = pos.coords.latitude
   lon = pos.coords.longitude

   let myLatlng = new google.maps.LatLng(lat, lon);

   let mapOptions = {
     center: myLatlng,
     zoom: 15,
     mapTypeId: google.maps.MapTypeId.roadmap //Cambiar esto
   };

   map = new google.maps.Map(document.getElementById("mapa"),  mapOptions);

   // Creamos el infowindow
   infowindow = new google.maps.InfoWindow();

   // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
   let request = {
     location: myLatlng,
     radius: 20000,
     types: ['parking']
   };

   // Creamos el servicio PlaceService y enviamos la petición.
   let service = new google.maps.places.PlacesService(map);

   service.nearbySearch(request, function(results, status) {
    console.log(results)
     if (status === google.maps.places.PlacesServiceStatus.OK) {
       for (let i = 0; i < results.length; i++) {
         crearMarcador(results[i]);//Aca se dibujaran los puntos obtenidos
       }
     }
   });
 });
}

 function crearMarcador(place)
 {
   // Creamos un marcador
   let marker = new google.maps.Marker({
     map: map,
     position: place.geometry.location
   });

 // Asignamos el evento click del marcador
   google.maps.event.addListener(marker, 'click', function() {
     infowindow.setContent(place.name);
     infowindow.open(map, this);
     setTimeout (redireccion(place), 4000);//Aca se puede poner una funcion de espera 
   });
}
let mapaid=''
let mapalugar=''

function redireccion(place){  
  
    sessionStorage.setItem("id", place.id);
    sessionStorage.setItem("lugar", place.name);
    console.log(place.id)
    
    window.location='../Reserva/Reserva.html'
   /*
   const xhr=new XMLHttpRequest()
   xhr.open('GET','Reserva.html',true)
    xhr.addEventListener('load',evt=>{
        dibujo.innerHTML=evt.target.responseText  
    })
    xhr.send()
*/
}






