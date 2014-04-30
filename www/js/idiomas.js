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
	'guardar':{es:"Guardar",eu:"Gorde",en:"Save",fr:"Sauver"},
	'me_interesa':{es:"Me interesa",eu:"Interesatzen zait",en:"I'm interested in",fr:"Je suis int&eacute;ress&eacute; par"},
	'si':{es:"S&iacute;",eu:"Bai",en:"Yes",fr:"Oui"},
	'no':{es:"No",eu:"Ez",en:"No",fr:"Aucun"},
	'descuentos':{es:"Ofertas",eu:"Ofertas",en:"Ofertas",fr:"Ofertas"},
	'restaurantes':{es:"Restaurantes",eu:"Restaurantes",en:"Restaurantes",fr:"Restaurantes"},
	'conciertos':{es:"Conciertos",eu:"Conciertos",en:"Conciertos",fr:"Conciertos"},
	'noconn':{es:"No hay conexi&oacute;n. Toca aqu&iacute; para volver a intentarlo.",
		  eu:"Konekzioarik ez. Saiatu berriro.",
		  en:"No connection. Tap here to try again.",
		  fr:"Pas de connexion. Appuyez ici pour essayer à nouveau."},
	}
}
