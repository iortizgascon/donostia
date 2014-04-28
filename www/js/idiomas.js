var Idioma = {
    idioma:'es',
 
    init: function (idioma) {
        this.idioma = idioma;
	$(".traducir").each(function(){
		indice = $(this).attr('data-text');
		atrib =	$(this).attr('data-atributo');			
		if (atrib){			
			$(this).attr(atrib,Idioma.get(indice));
		}else{
			$(this).html(Idioma.get(indice));
		}
	});

    },

    get:function(indice){
	if (indice in this.textos)
		if (this.idioma in this.textos[indice])
			return(this.textos[indice][this.idioma]);
	
    },

   textos:{
	'ahora':{es:"Ahora",eu:"Orain",en:"Now", fr:"Maintenant"},
	'cerca':{es:"Cerca",eu:"Hurbil",en:"Nearby", fr:"Proche"},
	'lista':{es:"Lista",eu:"Zerrenda",en:"List",fr:"Liste"},
	'mapa':{es:"Mapa",eu:"Mapa",en:"Map", fr:"Carte"},
	'guardar':{es:"Guardar",eu:"Gorde",en:"Save",fr:"Sauver"}

	}
}
