var Ficha = {
	fichas:{},
	fichaActual:0,
 

	
	vaciar:function(){
		this.fichas = {};
		
	},


	cargarDatos: function(){	
		loading("ficha_main_content",true);		
		ajax("ficha",{ficha:Ficha.fichaActual},Ficha.callback_ficha, Ficha.error);
	},

	callback_ficha: function(data){
		Ficha.fichaActual = data.idLocal;
		Ficha.fichas[Ficha.fichaActual] = data;
		Ficha.cargarFicha();
		loading("ficha_main_content",false);
	},

	error: function(){
		loading("ficha_main_content",false);
		pestanaFicha("f_main");
		$("#ficha_conn_error").show();
	},


	cargarFicha: function(id){	
		if (typeof id != 'undefined') Ficha.fichaActual=id;

		$("#ficha_main_content").html("");		
		

		if (!(Ficha.fichaActual in Ficha.fichas)) {	
			Ficha.cargarDatos();
			return;		
		}
		pestanaFicha("f_main");
		volcarCapa("ficha_main_content", Ficha.fichas[Ficha.fichaActual].ficha);			
	
	},

	
	cargarGaleria: function(){
		if (!(Ficha.fichaActual in Ficha.fichas)) {
			document.location.href="#ficha";	
			//Ficha.cargarDatos();
			return;		
		}

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
		if (!(Ficha.fichaActual in Ficha.fichas)) {	
			document.location.href="#ficha";	
			//Ficha.cargarDatos();
			return;		
		}

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
		if (!(Ficha.fichaActual in Ficha.fichas)) {	
			document.location.href="#ficha";	
			//Ficha.cargarDatos();
			return;		
		}

		pestanaFicha("f_location");
	
		
		puntos= {0:{lat:Ficha.fichas[Ficha.fichaActual].latitud,
			 lon:Ficha.fichas[Ficha.fichaActual].longitud,
			 titulo:Ficha.fichas[Ficha.fichaActual].titulo,
			 html:Ficha.fichas[Ficha.fichaActual].titulo}};

		centro={lat:Ficha.fichas[Ficha.fichaActual].latitud,
			 lon:Ficha.fichas[Ficha.fichaActual].longitud}

		
		Mapa.pintarMapa("ficha_main_content", centro, 15, puntos);
		
	}
	
}

