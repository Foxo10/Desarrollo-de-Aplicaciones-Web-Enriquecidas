// getElementById
function $id(id) {
    return document.getElementById(id);
}


// output information
function output(msg) {
    var m = $id("messages");
    m.innerHTML = msg + m.innerHTML;
}


// file drag hover
function fileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.target.className = (e.type == "dragover" ? "hover" : "");
}


// file selection
function fileSelectHandler(e) {

    // cancel event and hover styling
    fileDragHover(e);

    // fetch FileList object
    var files = e.target.files || e.dataTransfer.files;
    console.log(files.length);
    //if ( e.constructor.name !=  "DragEvent"){
        // process all File objects
        for (var i = 0, f; f = files[i]; i++) {
            console.log(f.name);
            parseFile(f);
        }
    //}

    // files can be added by drag&drop or clicking on form's button
    // if the later, append files to form files field 
    var formFiles = $id("upload").fileselect;
    if (formFiles.files.length == 0){
        formFiles.files = files;
    }

}


// output file information
function parseFile(file) {
    console.log(file.name);
    // para evitar archivos sin tipo MIME definido
    var tipo = file.type;
    if(tipo == ""){
        tipo = "undefined";
    }
    output(
        "<p>Datos del fichero: <strong>" + file.name +
        "</strong> Tipo: <strong>" + tipo +
        "</strong> Tamaño: <strong>" + file.size +
        "</strong> bytes</p>"
    );

}


function init() {
    var fileselect = $id("fileselect"),
        filedrag = $id("filedrag"),
        submitbutton = $id("enviar");

    //submitbutton.onclick = enviar($id("upload"));

    // file select
    fileselect.addEventListener("change", fileSelectHandler, false);

    // file drop
    filedrag.addEventListener("dragover", fileDragHover, false);
    filedrag.addEventListener("dragleave", fileDragHover, false);
    filedrag.addEventListener("drop", fileSelectHandler, false);
    filedrag.style.display = "block";

}
// Función para validar el campo de nombre
function validarNombre() {
    var nombre = document.getElementById('nombre').value.trim();
    var errorNombre = document.getElementById('error-nombre');
    if (nombre === '') {
        errorNombre.textContent = 'El campo del Nombre es obligatorio';
        return false;
    }
    errorNombre.textContent = '';
    return true;
}
// Función para validar el campo de teléfono
function validarTelefono() {
    var telefono = document.getElementById('tlfn').value.trim();
    var errorTelefono = document.getElementById('error-tlfn');
    if (!telefono.match(/^\d{3}(-)?\d{3}(-)?\d{3}$/))  {
        errorTelefono.textContent = 'El campo del telefono debe contener el patrón 123(-)456(-)789';
        return false;
    }
    errorTelefono.textContent = '';
    return true;
}
// Función para validar el campo de email
function validarEmail() {
    var email = document.getElementById('email').value.trim();
    var errorEmail = document.getElementById('error-email');
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errorEmail.textContent = 'El campo del email es incorrecto. Debe tener el siguiente formato: hola@gmail.com';
        return false;
    }
    errorEmail.textContent = '';
    return true;
}
// Función para validar el campo de libros
function validarLibros() {
    var libros = document.getElementById('libros').value.trim();
    var errorLibros = document.getElementById('error-libros');

    if (libros === '') {
        errorLibros.textContent = 'El campo del libro es obligatorio';
        return false;
    } else {
        errorLibros.textContent = '';
        return true;
    }

}
// Función para validar el campo de cantidad de libros
function validarCantidadLibros() {
    var cantidad = document.getElementById('cantidad').value;
    var errorCantidad = document.getElementById('error-cantidad');

    if (cantidad == 0) {
        errorCantidad.textContent = 'La cantidad debe ser un numero del 1 al 5';
        return false;
    } else {
        errorCantidad.textContent = '';
        return true;
    }

}


function enviarFormulario() {
    validarNombre();
    validarTelefono();
    validarEmail();
    validarLibros();
    validarCantidadLibros();

    var valido = document.getElementById('valido');
    valido.textContent = 'Formulario enviado correctamente';

    var formularioValido = validarNombre() && validarTelefono() && validarEmail() && validarCantidadLibros() && validarLibros();
    if (formularioValido) {
        console.log('¡Formulario enviado correctamente!');
        valido.style.visibility = "visible";
    } else {
        console.log('Por favor, completa correctamente todos los campos.');
        valido.style.visibility = "hidden";
    }
}

window.onload = () => {

    // Mostrar sugerencia de libros al hacer clic en el campo de libros
    const sugerirLibros = () => {
        var sugerencias = ['Libro1', 'Libro2', 'Libro3', 'Libro4', 'Libro5'];
        document.getElementById('libros').value = sugerencias.join(', ');
    };

    document.getElementById('libros').addEventListener('click', sugerirLibros);
    
    // call initialization file
    if (window.File && window.FileList) {
        init();
    }
    
    document.getElementById('enviar').addEventListener('click', enviarFormulario);
}