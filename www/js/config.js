var Config = {
   
    config:{idioma:'es',ahora:1,cerca:0,descuentos:1,restaurantes:1,conciertos:1},
 

    cargar: function (callback) {
        Db.select("SELECT id, valor FROM config",
		function(rs){
			
			//cojo todos los campos de config
			campos={}
			for (campo in Config.config){
				campos[campo] = 1;
			}
			var len = rs.rows.length;
			for (var i=0; i<len; i++){
				Config.config[rs.rows.item(i).id] = rs.rows.item(i).valor;
				campos[rs.rows.item(i).id] = 0; //campo guardado
			}

			//campos sin guardar
			ind = 0;
			sql = new Array();
			for (campo in Config.config){
				if (campos[campo]){
					//insertarlo en la BD.
					sql[ind] = "INSERT INTO config (id, valor) VALUES ('" + campo + "', '" + Config.get(campo) + "');";
					ind++;
				}
			}
			if (ind){
				Db.queryArray(sql,function(){});
			}
			
			Config.inicializar_form_config();	
			callback();
		} 
	);

    },

    inicializar_form_config:function(){

	
	//$("#cfg_idioma option[value='"+ this.get("idioma") +"']").attr("selected","selected");
	$("#cfg_idioma").val("" + this.get("idioma"));
	$("#cfg_idioma").trigger("change");

	$("#cfg_idioma").change(function(){
		Config.set('idioma',$("#cfg_idioma").val());
		Idioma.init(Config.get('idioma'));
	});

	$("#cfg_descuentos").attr('data-config', "descuentos");
	set_si_no('cfg_descuentos',Config.get("descuentos"));

	$("#cfg_restaurantes").attr('data-config', "restaurantes");
	set_si_no('cfg_restaurantes',Config.get("restaurantes"));

	$("#cfg_conciertos").attr('data-config', "conciertos");
	set_si_no('cfg_conciertos',Config.get("conciertos"));
	

    },
  
	
    crear:function(callback){
	//crear con valores por defecto.
	sql = new Array();
	sql[0] = "DROP TABLE IF EXISTS config";
	sql[1] = "CREATE TABLE config (id unique, valor);";
	ind=2;
	for (v in Config.config){
		sql[ind] = "INSERT INTO config (id, valor) VALUES ('" + v + "', '" + Config.get(v) + "');";	
		ind++;
	}

	Db.queryArray(sql,callback);
    },
    guardar:function(){
	sql = new Array();
	ind=0;
	for (v in this.config){
		sql[ind] = "UPDATE config SET valor = '" + this.config[v] + "' WHERE id ='" + v + "';";
		ind++;
	}

	Db.queryArray(sql,function(){});
	
    },

    get:function(campo){
	return(this.config[campo]);
    },
    set:function(campo,valor){
	this.config[campo]=valor;
	this.guardar();
    },
   
    getConfig:function(){
	return (this.config);
    },
}

