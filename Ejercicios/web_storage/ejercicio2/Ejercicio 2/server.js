let express = require("express");
let app = express();

app.set('view engine', 'ejs'); 
app.set('views', "views"); 

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

const apikey = '98d2660ab367ae8381f87098d49d2297';

app.get("/weather/:location", (req, res) => {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${req.params.location},es&appid=${apikey}`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        res.json(response);
      });
}); 

app.get("/", (req, res) => {
    res.render('index');
});

app.listen(3002);