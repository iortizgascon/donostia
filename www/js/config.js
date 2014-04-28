var Config = {
   
    config:{uuid:1,idioma:'es',ahora:1,cerca:0},
 

    cargar: function (callback) {
        Db.select("SELECT id, valor FROM config",
		function(rs){
			var len = rs.rows.length;
				for (var i=0; i<len; i++)
					Config.config[rs.rows.item(i).id] = rs.rows.item(i).valor;
			Config.inicializar_form_config();	
			callback();
		} 
	);

    },

 inicializar_form_config:function(){

	
	//$("#cfg_idioma option[value='"+ this.get("idioma") +"']").attr("selected","selected");
	$("#cfg_idioma").val("" + this.get("idioma"));
	$("#config form").submit(function(event){
		event.preventDefault();
		Config.set('idioma',$("#cfg_idioma").val());
		Idioma.init(Config.get('idioma'));

		$("#guardar_config").show();
	});

    },
  
	
    crear:function(callback){
	//crear con valores por defecto.
	sql = new Array();
	sql[0] = "DROP TABLE IF EXISTS config";
	sql[1] = "CREATE TABLE config (id unique, valor);";
	ind=2;
	for (v in this.config){
		sql[ind] = "INSERT INTO config (id, valor) VALUES ('" + v + "', '" + this.get(v) + "');";	
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

