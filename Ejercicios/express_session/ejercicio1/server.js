let express = require("express");
var session = require('express-session')

let app = express();

app.set('view engine', 'ejs'); 
app.set('views', "views"); 

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({secret: 'keyboard cat', resave: false}))

app.use(express.static("public"));

app.post("/login", (req, res) => {
    req.session.nombre = req.body.nombre;
    res.redirect("/");
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

app.get("/", (req, res) => {
    if(req.session.nombre) {
        res.render('index', {
            nombre: req.session.nombre
        });
    } else {
        res.render('not_logued');
    }
}); 


app.listen(3001);