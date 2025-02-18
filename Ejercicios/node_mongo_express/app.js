var express = require("express");
var app = express(); // el objeto app de Express nos permite multiples opciones

//let utils = require('./utils'); // sin “.js”
//app.listen(3002, utils.holamundo);

let wiki = require("./wiki.js");
app.use("/wiki", wiki);

app.listen(3001, function () { // devuelve el objeto servidor
    // mensaje que aparecera en la consola donde lancemos server.js
    console.log("Aplicación ejemplo, escuchando el puerto 3001!"); 
});




