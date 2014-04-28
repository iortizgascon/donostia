$(document).ready(function(){ init();});


var IDMOVIL=0;
var URL = "http://donostia.dinamowebs.com/app/";

function init(){

	//solo entramos una vez:
	
	if (!IDMOVIL){

		IDMOVIL = device.uuid;
		//cambiar la navegación:
		$(window).on('hashchange',function(){ 
		    navigate("#" + location.hash.slice(1));
		});
		//binds:

		icons();
		bindDialogs();
		$("#marco_close").click(function(){$("#marco_dialogo").hide()});	
		$("#nav_main li").click(function(){
			cambiarBtnCfg($(this).attr('id').substring(4));
		});
		$("#btn_mapa").click(function(){cargarMapa();});
		$("#btn_lista").click(function(){cargarLista();});

		Db.conectar();
		Db.existe(db_existe, db_no_existe);
	}
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


