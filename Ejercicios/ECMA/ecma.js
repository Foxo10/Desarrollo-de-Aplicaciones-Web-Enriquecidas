// Ejercicio 1
/*
class Punto {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  suma(punto) {
    return new Punto(this.x + punto.x, this.y + punto.y);
  }

}
console.log("Ejercicio 1");
console.log(new Punto(1, 2).suma(new Punto(2, 1)));
*/
// Ejercicio 2
class Locutor{
constructor(nombre, verbo) {
  this.nombre = nombre;
  this.verbo = verbo || "dice";
}
dice(text){
  console.log(this.nombre + " " + this.verbo + " '" + text + "'");
}

}

class Feriante extends Locutor {
constructor(nombre){
  super(nombre, "grita");

}
dice(text){
  super.dice(text.toUpperCase());
}
}

console.log("Ejercicio 2");
new Feriante("Mr. Crecepelo").dice("Me lo quitan de las manos");

// Ejercicio 3
function Punto(x, y){
  this.x = x;
  this.y = y;
}
Punto.prototype.suma = function(punto) {
return new Punto(this.x + punto.x, this.y + punto.y);
}
console.log("Ejercicio 3");
let p = new Punto(1, 2).suma(new Punto(2, 1));
console.log(p.x, p.y); // Se espera: 3 3
console.log(p instanceof Punto); // Se espera: true
console.log(p.constructor.name); // Se espera Punto

// Ejercicio 4
var contador = {
  cont: 0,
  sig : function(){
    return this.cont++;
  }
}
console.log("Ejercicio 4");
console.log(contador.sig()) // → 0
console.log(contador.sig()) // → 1
console.log(contador.sig()) // → 2

// Ejercicio 5
const almacen = [
  {tipo: "lavadora", valor: 5000},
  {tipo: "lavadora", valor: 650},
  {tipo: "vaso", valor: 10},
  {tipo: "armario", valor: 1200},
  {tipo: "lavadora", valor: 77}
]
var lavadoras = almacen.filter(function (objeto) {
  return objeto.tipo == "lavadora";
});

let totalValorLavadoras = lavadoras.reduce(function (accum, objeto) {
  return accum+objeto.valor;

}, 0);
console.log("Ejercicio 5");
console.log (totalValorLavadoras); // se espera 5727

// Ejercicio 6 
console.log("Ejercicio 6");
almacen.forEach(obj => console.log(obj.valor));

// Ejercicio 7
var lavadoras = almacen.filter(objeto => objeto.tipo == "lavadora"
);

let totValorLavadoras = lavadoras.reduce((suma, objeto) => objeto.valor + suma, 0);
console.log("Ejercicio 7");
console.log (totValorLavadoras); // se espera 5727

// Ejercicio 8
class ArrayOrdenado {
  constructor(comparador){
    this.comparador = comparador;
    this.contenido = []
  }
  findPos (elt) {
    return this.contenido.findIndex(x => this.comparador(elt,x) < 0);

  }
  insert (elt){
    return this.contenido.splice(this.findPos(elt), 0, elt);

  }
}
var ordenado = new ArrayOrdenado((a, b) => a - b );
ordenado.insert(5);
ordenado.insert(1);
ordenado.insert(2);
ordenado.insert(4);
ordenado.insert(3);

console.log("array:", ordenado.contenido); // array: [1, 2, 3, 4, 5]