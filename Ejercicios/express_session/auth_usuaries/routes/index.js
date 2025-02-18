var express = require('express');
var session = require('express-session');
var router = express.Router();
require('dotenv').config();
const MongoStore = require('connect-mongo');

console.log('Valor de GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS);


var admin = require("firebase-admin");

var serviceAccount = require("C:\\Users\\Portatil\\Desktop\\DAWE\\express_session\\auth_usuaries\\dawe-82db8-firebase-adminsdk-5njlo-92c5ba1d0e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


// Use the session middleware
router.use(session({
  secret: 'clavesecretaparaexpresss',
  saveUninitialized: true, // create session even if there is nothing stored
  resave: true, // save session even if unmodified
  cookie: { maxAge: 60 * 60 * 1000 },
  // modificacion para MongoDB
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/test-app'})
}));

// Para crear la sesion
router.post('/login',(req,res) => {
  req.session.email = req.body.email;
  res.end('done');
});

// Una vez iniciados, si intentamos acceder a /, automáticamente seremos redirigidos a /admin
router.get('/',(req,res) => {
  if(req.session.email) { // si estamos logueados, vamos a /admin
      return res.redirect('/admin');
  }
  res.render('index', { title : 'title'});
});

// si intentamos acceder a /admin sin autenticarnos
router.get('/admin',(req,res) => {
  if(req.session.email) {
      res.write(`<h1>Hello ${req.session.email} </h1><br>`);
      res.end('<a href='+'/logout'+'>Logout</a>');
  }
  else {
      res.write('<h1>Please login first.</h1>');
      res.end('<a href='+'/'+'>Login</a>');
  }
});

//  autenticados, para volver a /, tendremos que pinchar en “Logout”, lo cual destruirá la sesión
router.get('/logout',(req,res) => {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });
});


module.exports = router;
