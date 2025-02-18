var express = require("express");
var router = express.Router(); // usamos este objeto router en lugar de app
 
router.get("/", function (req, res) { 
  res.send("Página de inicio Wiki");
});

router.get("/about", function (req, res) {
  res.send("Acerca de esta wiki");
});

module.exports = router; // exportamos este objeto router

// Incluso si en wiki.js hemos definido la petición GET /, al montarlo en wiki/, la petición pasará a ser wiki/. 
// Si en wiki.js hemos definido la petición GET /about, al montarlo en wiki/, la petición pasará a ser wiki/about/.
