var Mapa={

	puntos:{},
	centro:{lat:43.316510,lon:-1.9732},

	setPuntos:function(p){
		Mapa.puntos=p;
	},

	getGeo: function(geoLocExito, geoLocError){
		navigator.geolocation.getCurrentPosition(geoLocExito,geoLocError,{enableHighAccuracy:true});
	},



	pintarMapa: function(capa, zoom){
	
			 
			var mapOptions = {
			    zoom: zoom,
			    center: new google.maps.LatLng(Mapa.centro.lat,Mapa.centro.lon)
			  }
			  var map = new google.maps.Map(document.getElementById(capa), mapOptions);
			var bounds = new google.maps.LatLngBounds();

			for (var ind in Mapa.puntos) {
				punto = Mapa.puntos[ind];
			 	 var infowindow = new google.maps.InfoWindow({
				      content: punto.html
				  });
				elPunto = new google.maps.LatLng(punto.lat,punto.lon);
				  var marker = new google.maps.Marker({
				      position:  elPunto,
				      map: map,
				      title: punto.titulo
				  });
				Mapa.addList(map, marker,infowindow);		
				bounds.extend(elPunto);

			}
			var span = bounds.toSpan();
			if (span.lat() > 0.0001 && span.lng() > 0.0001) {
				map.fitBounds(bounds);	
			}
	},

	addList:function(map, marker,infowindow){
	  	google.maps.event.addListener(marker, 'click', function() {
		    infowindow.open(map,marker);
		  });
	}


}
