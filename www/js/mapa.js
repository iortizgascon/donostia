

function getGeo(geoLocExito){
	navigator.geolocation.getCurrentPosition(geoLocExito,geoLocError,{enableHighAccuracy:true});
}


function geoLocError(error){
	console.log("No se ha detectado la ubicación");
	//esto es para pruebas en el ordenador!!
		Config.set('lat', 43.3174604);
		Config.set('lon', -1.9685667);
		ajax("lista",{},callback_main);
	
}

function pintarMapa(capa, lat, lon, zoom, puntos){
	
	 
	  var mapOptions = {
	    zoom: zoom,
	    center: new google.maps.LatLng(lat,lon)
	  }
	  var map = new google.maps.Map(document.getElementById(capa), mapOptions);


	var bounds = new google.maps.LatLngBounds();

	

	for (var ind in puntos) {
		punto = puntos[ind];
	
	 	 var infowindow = new google.maps.InfoWindow({
		      content: punto.html
		  });

		elPunto = new google.maps.LatLng(punto.lat,punto.lon);

		  var marker = new google.maps.Marker({
		      position:  elPunto,
		      map: map,
		      title: punto.titulo
		  });
		
		addList(map, marker,infowindow);
		
		bounds.extend(elPunto);
		


	}
	var span = bounds.toSpan();
	if (span.lat() > 0.0001 && span.lng() > 0.0001) {
		map.fitBounds(bounds);	
	}
}

function addList(map, marker,infowindow){
  	google.maps.event.addListener(marker, 'click', function() {
	    infowindow.open(map,marker);
	  });
}


function geoLocate(){
	//devolver mi posición
	return({lat:43.316510,lon:-1.9732});
}
