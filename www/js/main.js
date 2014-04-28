var puntosMapa = {};
var fichaActual = {};

function navigate(enlace){
	if (enlace=="#") enlace = "#main";
	

	capa = enlace;

	if (enlace.substring(0,7)=="#ficha_"){
		cargarDatosFicha(enlace.substring(7));
		capa = "#ficha";				
	}

	if (enlace=="#ficha"){
		cargarFicha();		
	}

	if (enlace=="#galeria"){
		cargarGaleria();
		capa = "#ficha";
	}
	if (enlace=="#valoraciones"){
		cargarValores();
		capa = "#ficha";
	}
	
	if (enlace=="#location"){
		cargarLocation(enlace.substring(10));
		capa = "#ficha";
	}

	if (enlace == "#main"){
		cargarMain();
	}
	
	if (enlace == "#config"){
		cargarConfig();
	}
	
	//si no...
	showPage(capa);
	return true;
}


function cargarMain(){
	loading("lista",true);	
	getGeo(function(position){		
		Config.set('lat', position.coords.latitude);
		Config.set('lon', position.coords.longitude);
		ajax("lista",{},callback_main);
	});
}

function callback_main(data){
	volcarCapa("lista", data.lista)
	puntosMapa = data.lugares;
	loading("lista",false);
}

function cargarDatosFicha(id){
	$("#ficha_main_content").html("");
	loading("ficha",true);
	ajax("ficha",{ficha:id},callback_ficha);
}

function callback_ficha(data){
	fichaActual = data;
	 cargarFicha();
	loading("ficha",false);
}


function cargarFicha(){
	pestanaFicha("f_main");
	volcarCapa("ficha_main_content", fichaActual.ficha);	
}
function cargarGaleria(id){
	pestanaFicha("f_galeria");

	html = '<div class="swiper-container">\n';
      	html = html + '<div class="swiper-wrapper">\n';
	
	for (ind in fichaActual.galeria)
        	html = html + '<div class="swiper-slide"> <img src="' + fichaActual.galeria[ind]  +'"> </div>\n'
	
	html = html + '</div>\n';
	html = html + '</div>';


	volcarCapa("ficha_main_content", html);
	$('.swiper-container').swiper({
	    //Your options here:
	    mode:'horizontal',
	    loop: true
	    //etc..
	  });

}
function cargarValores(){
	pestanaFicha("f_valoraciones");
	volcarCapa("ficha_main_content", fichaActual.valores);	
	$("#puntuar").change(function(){
		puntos = $(this).val();
		ajax("votar",{nota:puntos,local:fichaActual.idLocal,texto:""},callback_votar);
		loading("valoracion_capa",true);
	});
}

function callback_votar(data){
	loading("valoracion_capa",false);
	loading("marco_dialogo_contenido",false);
	$("#marco_dialogo").hide();
	if (data.ok==0){
		$("#valoracion_capa .error").html("No se puede conectar en este momento. Int&eacute;ntalo m&acute;s tarde");
	}else{
		fichaActual = data.ficha;
		cargarValores();
	}
}

function cargarLocation(){
	pestanaFicha("f_location");
	
	var puntos = [];
	puntos[0] = {lat:fichaActual.latitud,
		 lon:fichaActual.longitud,
		 titulo:fichaActual.titulo,
		 html:fichaActual.titulo + " (" + fichaActual.nota + "/10)"};

	pintarMapa("ficha_main_content", fichaActual.latitud, fichaActual.longitud, 15, puntos);
}



function cargarConfig(){
	$(".btn_ok").hide();
}
function cargarMapa(){
	//de la lista al mapa

	posicion = geoLocate();
	pintarMapa("mapa", posicion.lat, posicion.lon, 15, puntosMapa);

	$("#btn_lista").removeClass("selected");
	$("#btn_mapa").addClass("selected");
	$("#lista").hide();
	$("#mapa").show();
}

function cargarLista(){
	//del mapa a la lista
	$("#btn_lista").addClass("selected");
	$("#btn_mapa").removeClass("selected");
	$("#mapa").hide();
	$("#lista").show();
}


function bind_escribirTexto(){
	
	$("#marco_dialogo_contenido input[type='button']").click(function(){
		texto = $("#marco_dialogo_contenido textarea").val();
		if (texto) texto = escape(texto);
		ajax("votar",{nota:-1,local:fichaActual.idLocal,texto:texto},callback_votar);
		loading("marco_dialogo_contenido",true);
	});
}


