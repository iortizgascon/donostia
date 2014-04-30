var Ficha = {
	fichas:{},
	fichaActual:0,
 

	cargarDatos: function(){			
		ajax("ficha",{ficha:Ficha.fichaActual},Ficha.callback_ficha, Ficha.error);
	},

	callback_ficha: function(data){
		Ficha.fichaActual = data.idLocal;
		Ficha.fichas[Ficha.fichaActual] = data;
		Ficha.cargarFicha();
	},

	error: function(){
		loading("ficha_main_content",false);
		pestanaFicha("f_main");
		$("#ficha_conn_error").show();
	},


	cargarFicha: function(id){	
		if (typeof id != 'undefined') Ficha.fichaActual=id;

		$("#ficha_main_content").html("");
		loading("ficha_main_content",true);
		if (Ficha.fichaActual in Ficha.fichas) {
			pestanaFicha("f_main");
			volcarCapa("ficha_main_content", Ficha.fichas[Ficha.fichaActual].ficha);
			loading("ficha_main_content",false);
		}else{

			Ficha.cargarDatos();
		}			
	},

	
	cargarGaleria: function(){
		pestanaFicha("f_galeria");

		html = '<div class="swiper-container">\n';
	      	html = html + '<div class="swiper-wrapper">\n';
	
		for (ind in Ficha.fichas[Ficha.fichaActual].galeria)
			html = html + '<div class="swiper-slide"><div class="foto"><img src="' + Ficha.fichas[Ficha.fichaActual].galeria[ind]  +'"></div></div>\n'
	
		html = html + '</div>\n';
		html = html + '</div>';


		volcarCapa("ficha_main_content", html);
		$('.swiper-container').swiper({
		    //Your options here:
		    mode:'horizontal',
		    loop: true
		    //etc..
		  });

	},
	
	cargarValores: function(){
		pestanaFicha("f_valoraciones");
		volcarCapa("ficha_main_content", Ficha.fichas[Ficha.fichaActual].valores);	
		$("#puntuar").change(function(){
			puntos = $(this).val();
			ajax("votar",{nota:puntos,local:Ficha.fichas[Ficha.fichaActual].idLocal,texto:""},Ficha.callback_votar);
			loading("valoracion_capa",true);
		});
	},



	callback_votar: function(data){
		loading("valoracion_capa",false);
		loading("marco_dialogo_contenido",false);
		$("#marco_dialogo").hide();
		if (data.ok==0){
			$("#valoracion_capa .error").html("No se puede conectar en este momento. Int&eacute;ntalo m&acute;s tarde");
		}else{
			Ficha.fichas[Ficha.fichaActual] = data.ficha;
			Ficha.cargarValores();
		}
	},

	cargarLocation: function(){
		pestanaFicha("f_location");
	
		var puntos = [];
		puntos[0] = {lat:Ficha.fichas[Ficha.fichaActual].latitud,
			 lon:Ficha.fichas[Ficha.fichaActual].longitud,
			 titulo:Ficha.fichas[Ficha.fichaActual].titulo,
			 html:Ficha.fichas[Ficha.fichaActual].titulo + " (" + Ficha.fichas[Ficha.fichaActual].nota + "/10)"};

		pintarMapa("ficha_main_content", Ficha.fichas[Ficha.fichaActual].latitud, Ficha.fichas[Ficha.fichaActual].longitud, 15, puntos);
	},

	bind_escribirTexto: function(){
	
		$("#marco_dialogo_contenido input[type='button']").click(function(){
			texto = $("#marco_dialogo_contenido textarea").val();
			if (texto) texto = escape(texto);
			ajax("votar",{nota:-1,local:Ficha.fichas[Ficha.fichaActual].idLocal,texto:texto},Ficha.callback_votar);
			loading("marco_dialogo_contenido",true);
		});
	}

}

