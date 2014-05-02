var Mapa={

	map:{},
	puntos_lista:{},
	centro_ciudad:{lat:43.316510,lon:-1.9732},


	setPuntos:function(puntos){
		Mapa.puntos_lista=puntos;
	},

	getGeo: function(geoLocExito, geoLocError){
		navigator.geolocation.getCurrentPosition(geoLocExito,geoLocError,{enableHighAccuracy:true});
	},


	mapaLista: function(capa, zoom){
	
		Mapa.pintarMapa(capa, Mapa.centro_ciudad, zoom, Mapa.puntos_lista);

	},

	pintarMapa: function(capa, centro, zoom, puntos){
			

			mapOptions = {
			    zoom: zoom,
			    center: new google.maps.LatLng(centro.lat,centro.lon)
			  }
			this.map = new google.maps.Map(document.getElementById(capa), mapOptions);
			bounds = new google.maps.LatLngBounds();

			
			for (var ind in puntos) {
				punto = puntos[ind];
			 	 infowindow = new google.maps.InfoWindow({
				      content: punto.html
				  });
				elPunto = new google.maps.LatLng(punto.lat,punto.lon);
				  marker = new google.maps.Marker({
				      position:  elPunto,
				      map: this.map,
				      title: punto.titulo
				  });
				Mapa.addList(marker,infowindow);		
				bounds.extend(elPunto);

			}


			span = bounds.toSpan();
			if (span.lat() > 0.0001 && span.lng() > 0.0001) {
				Mapa.map.fitBounds(bounds);	
			}
	},

	addList:function(marker,infowindow){
	  	google.maps.event.addListener(marker, 'click', function() {
		    infowindow.open(this.map,marker);
		  });
	}


}
