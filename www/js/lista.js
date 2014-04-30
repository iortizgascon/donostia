var Lista = {

	ultimaCarga:0,
	

	cargar: function(){

		if (Lista.timeout()){
			loading("lista",true);	
			Mapa.getGeo(function(position){		
					Config.set('lat', position.coords.latitude);
					Config.set('lon', position.coords.longitude);
					ajax("lista",{},Lista.callback, Lista.error);
				},
				function(error){
					console.log("No se ha detectado la ubicación");
					//esto es para pruebas en el ordenador!!
					Config.set('lat', 43.3174604);
					Config.set('lon', -1.9685667);
					ajax("lista",{},Lista.callback, Lista.error);
	
				}
			);
		}		
	},

	callback: function(data){
		volcarCapa("lista", data.lista);
		Mapa.setPuntos(data.lugares);
		Lista.setCarga();
		loading("lista",false);
	},

	error: function(){
		$("#lista_conn_error").show();
		loading("lista",false);
	},

	timeout: function(){
		var ts = Math.round((new Date()).getTime() / 1000);
		return (ts - Lista.ultimaCarga > 600); 
	},

	setCarga: function(){
		Lista.ultimaCarga =  Math.round((new Date()).getTime() / 1000);
	}




}
