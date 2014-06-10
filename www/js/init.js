$(document).ready(function(){ init();});


var IDMOVIL=1; //para pruebas
var URL = "http://donostia.dinamowebs.com/app/";
var PRIMERAVEZ=false;

function init(){

	init_utils();
	init_main();

	Db.conectar();
	Db.existe(db_existe, db_no_existe);
	
}


function db_existe(){
	Config.cargar(config_cargado);	
}

function db_no_existe(){
	PRIMERAVEZ = true;
	//mostrar idioma
	$("#seleccion_idiomas").show();

	//bind botones
	$("#seleccion_idiomas ul li").click(function(){
		Config.config.idioma = $(this).attr("data-language");
		$("#seleccion_idiomas").hide();
		Config.crear(db_existe);
	});
}



function config_cargado(){
		
	Idioma.init(Config.get('idioma'));
	//actualizarBoton("ahora");
	actualizarBoton("cerca");
	actualizarBoton("comer");
	actualizarBoton("musica");
	$("header").show();
		
	if (PRIMERAVEZ){
		showPage("#config");
		cargarConfig();
	}else{
		showPage("#main");
		Lista.cargar();
	}
}


