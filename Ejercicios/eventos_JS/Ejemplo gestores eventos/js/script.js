function inicializarGestores()
{	
	/*
	var imagen = document.getElementById("imagen");
	imagen.onclick = function()
	{
		alert("Has pulsado la imagen");
	}
	*/

	var usuario = document.getElementById("usuario");
	usuario.value = 'tu@email';

	usuario.onblur = function(){
		if (usuario.value == ''){
			usuario.value = "tu@email";
		}
	}

	usuario.onfocus = function(){
		if (usuario.value == 'tu@email'){
			usuario.value = '';
		}
	}

	var item = document.getElementById("combobox");
	item.addEventListener("change",gestorCombo);

	function gestorCombo(){
		console.log(item.value);
		console.log(item.options[item.selectedIndex].text);
		console.log(item.selectedIndex);
	} 

	var formulario = document.getElementById('formulario');
	formulario.onsubmit = function(){
		console.log("click en submit");
			return false;
	}

	// Ejercicion 1
	var imagenes = ['images/limon.jpg','images/fresas.jpg','images/mandarinas.jpg','images/manzanas.jpg','images/melon.jpg','images/heade_ft.jpg'];

	var idxImagen = 0;

	function cambiarImagen(){
		console.log("cambio_de_imagen");
		var div = document.getElementById('imagen');
		div.style.backgroundImage = "url("+imagenes[idxImagen]+")";
		idxImagen ++;
		if(idxImagen == imagenes.length){
			idxImagen = 0;
		}
	}
	let reloj = setInterval(cambiarImagen, 5000);
	var imagen = document.getElementById('imagen');

	imagen.addEventListener("click", function(){
		clearInterval(reloj);
		console.log("detener_imagen");

	});
}

window.onload = inicializarGestores;
