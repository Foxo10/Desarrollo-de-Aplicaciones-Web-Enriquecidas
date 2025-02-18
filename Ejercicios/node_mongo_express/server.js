var http = require("http"); // import de node
http.createServer(function (request, response) { // esta funcion se llama al recibir una peticion
    // Se define la cabecera HTTP, con el estado HTTP (OK: 200) y el tipo de contenido
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hola mundo!\n"); // el mensaje que queremos enviar
    response.end(); // envio
}).listen(8000); // definimos el puerto de escucha

// Se escribe la URL para el acceso al servidor
console.log("Servidor en la url http://127.0.0.1:8000/");
