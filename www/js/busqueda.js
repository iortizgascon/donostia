var Busqueda = {

	
	

	buscar: function(cadena){
		if (cadena.length>1)
			ajax("nombre",{nombre:cadena},Busqueda.callback, Busqueda.error);
		else
			$("#resultados_busqueda").html("");	
				
	},

	callback: function(data){
		volcarCapa("resultados_busqueda", data.resultados);
		//loading("lista",false);
	},

	error: function(){
		$("#resultados_busqueda").html("");
		//loading("lista",false);
	},

	reset: function(){
		$("#resultados_busqueda").html("");
		$("#busqueda").val("");
	},

	

}
