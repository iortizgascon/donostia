function init_main(){
	$("#nav_main li").click(function(){
		cambiarBtnCfg($(this).attr('id').substring(4));
	});
	$("#btn_mapa").click(function(){cargarMapa();});
	$("#btn_lista").click(function(){cargarLista();});

	$("#lista_conn_error").click(function(){
		Lista.cargar();
		$(this).hide();
	});

	$("#ficha_conn_error").click(function(){
		Ficha.cargarFicha();
		$(this).hide();
	});

}

function navigate(enlace){
	if (enlace=="#") enlace = "#main";
	

	capa = enlace;

	if (enlace.substring(0,7)=="#ficha_"){
		Ficha.cargarFicha(enlace.substring(7));
		capa = "#ficha";				
	}

	if (enlace=="#ficha"){
		Ficha.cargarFicha();		
	}

	if (enlace=="#galeria"){
		Ficha.cargarGaleria();
		capa = "#ficha";
	}
	if (enlace=="#valoraciones"){
		Ficha.cargarValores();
		capa = "#ficha";
	}
	
	if (enlace=="#location"){
		Ficha.cargarLocation(enlace.substring(10));
		capa = "#ficha";
	}

	if (enlace == "#main"){
		Lista.cargar();
	}
	
	if (enlace == "#config"){
		cargarConfig();
	}
	
	//si no...
	showPage(capa);
	return true;
}




function cargarConfig(){
	$(".btn_ok").hide();
}
function cargarMapa(){
	//de la lista al mapa

	
	Mapa.mapaLista("mapa", 15);


	$("#btn_lista").removeClass("selected");
	$("#btn_mapa").addClass("selected");
	$("#lista").hide();
	$("#mapa").show();
}

function cargarLista(){
	//del mapa a la lista
	$("#btn_lista").addClass("selected");
	$("#btn_mapa").removeClass("selected");
	$("#mapa").html('');
	$("#lista").show();
}




