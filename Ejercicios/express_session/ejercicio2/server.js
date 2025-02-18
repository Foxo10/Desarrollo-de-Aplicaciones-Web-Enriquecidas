let express = require("express");
var session = require('express-session')

let app = express();

app.set('view engine', 'ejs'); 
app.set('views', "views"); 

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({secret: 'keyboard cat', resave: false}))

app.use(express.static("public"));

app.get("/animal/:animal", (req, res) => {
    req.session.animal = req.params.animal;
    req.session.save((err) => {
        res.json({message :`ok`})
    });
});

app.get("/preguntar_animal", (req, res) => {
    res.json({'animal': req.session.animal});
});

app.get("/otraseccion", (req, res) => {
    res.render('index2');
});

app.get("/", (req, res) => {
    res.render('index');
}); 

app.listen(3002);