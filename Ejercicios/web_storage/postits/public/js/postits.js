/* postits.js
 *
 */

window.onload = init;

function init() {
    localStorage.setItem("focoId", "0");

	var addButton = document.getElementById("add_button");
	addButton.onclick = createSticky;

    var clearButton = document.getElementById("clear_button");
    clearButton.onclick = clearStickyNotes;

    localStorage.setItem("noteCounter", 1);

	// cargar las notas postit de localStorage  
	// cada nota se guarda como un par así: postit_X = texto_de_la_nota
	// donde X es el número de la nota
	// por cada una de ellas, llamar al método
	// addStickyToDOM(texto_de_la_nota);

    for (var i = 0; i < localStorage.length; i++) {
        localStorage.setItem("noteCounter", i);
        var key = localStorage.key(i);
        // Verificar si la clave es una nota (comienza con "postit_")
        if (key.startsWith("postit_")) {
            var value = localStorage.getItem(key);
            // Agregar la nota al DOM
            addStickyToDOM(key, value);
        }
    }
    updateLocalStorageUsage();
}

function createSticky() {
	var value = document.getElementById("note_text").value;
	
        // crear la nota con nombre postit_X, donde X es un número entero
	// (postit_1, postit_2, ...)  y guardarla en el localStorage
	
    // Obtener el contador de notas de localStorage
    var noteCounter = localStorage.getItem("noteCounter");
    if (!noteCounter) {
        noteCounter = 1;
    } else {
        noteCounter++;
    }
    
    localStorage.setItem("noteCounter", noteCounter);
    
    var noteId = "postit_" + noteCounter;
    localStorage.setItem(noteId, value);

	addStickyToDOM(noteId, value);

    updateLocalStorageUsage();
}


function addStickyToDOM(noteId, value) {
	var stickies = document.getElementById("stickies");
	var postit = document.createElement("li");
	var span = document.createElement("span");
	span.setAttribute("class", "postit");
	span.innerHTML = value;
	postit.appendChild(span);
	stickies.appendChild(postit);

    postit.addEventListener("mouseover", function(event) {

        cambioColorHover();

        postit.style.backgroundColor = "lightblue";

        var nFocoId = noteId.split("_")[1];


        localStorage.setItem("focoId", nFocoId);


    });

}

function cambioColorHover(){
    var postitElements = document.querySelectorAll("li");
    // Restaurar el color original de todos los post-it
    postitElements.forEach(function(postitElement) {
        postitElement.style.backgroundColor = "";
    });

}

function clearStickyNotes() {
	// Crear un nuevo botón en la ventana de postit notes que al pulsarlo,
	// elimine las notas de pantalla y de localStorage
	// Algoritmo:	
	// obtener una referencia a la capa "stickies"
	// recorrer los hijos (childNodes) de esa referencia,
	// eliminándolos uno a uno (removeChild)

    var foco = localStorage.getItem("focoId");
    if (foco != 0) {
        var postitId = "postit_" + foco;
        var postit_frase = localStorage.getItem(postitId);
        var stickies = document.getElementById("stickies");
        var postitElements = stickies.getElementsByTagName("li");

        for (var i = 0; i < postitElements.length; i++) {
            var postitElement = postitElements[i];
            var span = postitElement.querySelector("span.postit");
            if (span.innerText.trim() === postit_frase) {
                // Eliminar el elemento de post-it del DOM
                stickies.removeChild(postitElement);

                // Eliminar el post-it del localStorage
                var postitId = "postit_" + foco;
                localStorage.removeItem(postitId);

                var count = localStorage.getItem("noteCounter");
                localStorage.setItem("noteCounter", parseInt(count - 1));
                localStorage.setItem("focoId", "0");

                break; // Salir del bucle después de eliminar el elemento
            }
        }
    }
    else{
        var stickies = document.getElementById("stickies");
        stickies.innerHTML = '';
        Object.keys(localStorage).forEach(function(key) {
            if (key.startsWith("postit_")) {
                localStorage.removeItem(key);
            }
        });
        localStorage.setItem("noteCounter", "0");
    }

    localStorage.setItem("focoId", "0");

    updateLocalStorageUsage();
}

function calculateLocalStorage() {
    let totalSize = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        totalSize += (key.length + value.length) * 2; 
    }
    const totalKB = totalSize / 1024; 
    return totalKB.toFixed(2); 
}

function updateLocalStorageUsage() {
    const spaceUsed = calculateLocalStorage();
    document.getElementById("space_usage").innerText = `Espacio utilizado: ${spaceUsed} KB`;
}