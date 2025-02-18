var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var { check, validationResult } = require("express-validator");

// Conexion con MongoDB
var mongojs = require('mongojs');
var  ObjectId = mongojs.ObjectId;
var db = mongojs('clientesapp', ['users']); // base de datos y tabla

var app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false})); 

// Variables globales
app.locals.users = [];
app.locals.errors = null;

app.post('/users/add', [
	check("first_name", "El nombre es obligatorio").notEmpty(),
	check("last_name", "El apellido es obligatorio").notEmpty(),
	check("email", "El email es obligatorio").notEmpty()
],
function(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.render('index', {
			title:'clientes',
			users: app.locals.users,
			errors: errors.array()
		});
	} else {
		var newUser = {
			"first_name" : req.body.first_name,
			"last_name" : req.body.last_name,
			"email" : req.body.email,
		};
		db.users.insertOne(newUser, function(err, resp) {
			if(err) {
				console.log(err);
			} else {
				db.users.insertOne(newUser);
			}
			res.redirect('/');
		});
		console.log(newUser)
	}
});

app.delete('/users/delete/:id', (req, res) => {
	db.users.remove({_id: ObjectId(req.params.id)}, (err, result) => {
		if (err){
			console.log(err);
		}
		res.redirect(303, '/');
	});
});

app.get("/", function(req, res) { // peticion y respuesta como parametros
    db.users.find(function(err, docs) {
    	if(err) {
    		console.log(err);
    	} else {
			app.locals.users = docs;
    		console.log(docs);
    		// para rellenar la plantilla
    		res.render('index', {
			title: 'clientes',
			users: app.locals.users
    		});
    	}
    });
    
});

app.listen(3001, () => {
	console.log("Servidor lanzado en el puerto 3000");
});