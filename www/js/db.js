var Db = {
    conn:{},
       
 conectar: function () {
	this.conn = window.openDatabase("ocio_dss", "", "Ocio en Donostia", 1024*1024);
    },
 
    existe:function (f_si, f_no) {
	
	this.conn.transaction(
	      function(tx){
		tx.executeSql("SELECT id FROM config LIMIT 1;",[], 
			function(tx, rs){Db.rs={};f_si();},  
			function(tx, err){Db.rs={};f_no();})
	       },	    
               Db.errorCB
	  );

   },
 
 

    errorCB:function(tx, err) {alert("Error de almacenamiento");alert(err);},
 
    select:function(sql, cb_exito){	
	
	this.conn.transaction(
	      function(tx){
		tx.executeSql(sql,[], function(tx, rs){cb_exito(rs);},  Db.errorCB );
	       },	    
               Db.errorCB
	  );

    },

  
    queryArray:function(sqls, callback){

	this.conn.transaction(
	      function(tx){
		for (i in sqls)
			tx.executeSql(sqls[i]);
	      },
	      Db.errorCB,
	      function (tx, rs) { callback(); }
	   
	  );

    },

   
}
