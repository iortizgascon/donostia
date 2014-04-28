$(document).ready(function(){ init();});


var IDMOVIL=1; //para pruebas
var URL = "http://donostia.dinamowebs.com/app/";

function init(){

	init_utils();
	$("#nav_main li").click(function(){
		cambiarBtnCfg($(this).attr('id').substring(4));
	});
	$("#btn_mapa").click(function(){cargarMapa();});
	$("#btn_lista").click(function(){cargarLista();});

	Db.conectar();
	Db.existe(db_existe, db_no_existe);
	
}


function db_existe(){
	Config.cargar(config_cargado);	
}

function db_no_existe(){
	//mostrar idioma
	$("#seleccion_idiomas").show();

	//bind botones
	$("#seleccion_idiomas ul li").click(function(){
		Config.config.idioma = $(this).attr("data-language");
		$("#seleccion_idiomas").hide();
		Config.crear(config_cargado);
	});
}

function config_cargado(){
		
	Idioma.init(Config.get('idioma'));
	actualizarBoton("ahora");
	actualizarBoton("cerca");
	$("header").show();
	showPage("#main");
	cargarMain();
}


