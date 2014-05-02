function init_utils(){
//cambiar la navegación:
	$(window).on('hashchange',function(){ 
	    navigate("#" + location.hash.slice(1));
	});
	//binds:

	icons();
	triggerContenido("body");
	$("#marco_close").click(function(){$("#marco_dialogo").hide()});	
}


function ajax(comando, parametros, callback, callbackError){

	postData = parametros;	
	postData.cmd=comando;
	
	//añadir los parametros de configuración
	objCfg = Config.getConfig();
	for (var attrname in objCfg) { postData[attrname] = objCfg[attrname]; }

	postData.uuid=IDMOVIL;


	var jqxhr = $.ajax({
		url:URL,
		type:"POST",
		dataType:"JSON",
		data:postData
		
	 })
	  .done(function(data, textStatus, jqXHR) {
		if (callback){
			callback(data);
		}
	  })
	  .fail(function(jqXHR, textStatus, errorThrown) {
		console.log(textStatus);
		if (typeof callbackError != 'undefined')
		    	callbackError();
	  });
}

function pestanaFicha(pestana){
	$("#nav_ficha li").removeClass("selected");
	$("#nav_ficha li#" + pestana).addClass("selected");
}

function cambiarBtnCfg(id){
	viejo = Config.get(id);
	Config.set(id,1-viejo);
	actualizarBoton(id);
}

function actualizarBoton(id){
	valor=Config.get(id);
	$("#btn_" + id).removeClass("selected");	
	if (valor*1)
		$("#btn_" + id).addClass("selected");
}


function volcarCapa(id, html){
	$("#" + id).html(html);
	triggerContenido("#" + id);

}

function loading(capa, activar){
	//id de capa, activar=1|0
	
	if (activar)
		$( "#" + capa ).prepend( '<div class="loading"></div>' );
	else
		$( "#" + capa + " .loading").remove();
}

function icons(){
	$(".icon").each(function(){
		$(this).click(function(){
			document.location.href=$(this).attr('data-href');
		});
	});
}

function showPage(pagina){	
	$(".page").hide();
	$(pagina).show();
}

function triggerContenido(padre){

	$(padre + " .btn_dialogo").each(function(){
		$(this).click(function(){
			id = $(this).attr("data-target");
			funcion = $(this).attr("data-function");			
			$("#marco_dialogo_contenido").html($("#" + id).html());
			if (funcion) window[funcion]();
			$("#marco_dialogo").show();
		});
	});

	$(padre + " .select select").each(function(){
		$(this).parent().children("span").html($(this).children("option:selected").text());
		$(this).change(function(){
			$(this).parent().children("span").html($(this).children("option:selected").text());
		});
	});


	$(padre +" .si_no").each(function(){
		
		if (!$(this).html())
			$(this).html('<span class="traducir si" data-value="1" data-text="si"></span><span class="traducir no" data-value="0" data-text="no"></span>');

		$(this).children("span").click(function(){
			valor = $(this).attr('data-value');
			id = $(this).parent().attr('id');
			set_si_no(id,valor);
			config_name = $(this).parent().attr('data-config');
			Config.set(config_name,valor);
		});
	});
}



function set_si_no(id,valor){

	if (valor=="1") span = $("#" + id + " span.si");
	else span = $("#" + id + " span.no");

	$("#" + id + " span").removeClass("selected");
	$(span).addClass("selected");
	
}

function bind_escribirTexto(){
	
	$("#marco_dialogo_contenido input[type='button']").click(function(){
		texto = $("#marco_dialogo_contenido textarea").val();
		if (texto) texto = escape(texto);
		ajax("votar",{nota:-1,local:Ficha.fichas[Ficha.fichaActual].idLocal,texto:texto},Ficha.callback_votar);
		loading("marco_dialogo_contenido",true);
	});
}



