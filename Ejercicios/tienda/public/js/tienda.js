import Rueda from './rueda.js';
import Cuadro from './cuadro.js';
import Cambio from './cambio.js';

const productos = [
  new Rueda('Rueda delantera Shimano RS710-C46', 430, 'Shimano'),
  new Rueda('Rueda delantera Zipp 303 Disc Carbon', 580, 'Zipp'),
  new Cuadro('S-Works Tarmac SL7 Carbon', 4700, 'Escalador-Aerodinámico'),
  new Cuadro('Cervélo S5', 5750, 'Aerodinámico'),
  new Cambio('Shimano Ultegra Di2 R8170 Groupset', 1389, 'Electrónico'),
  new Cambio('Shimano Ultegra R8000', 950, 'Mecánico'),
];

const tiposUnicos = [...new Set(productos.map(producto => producto.constructor.tipo()))];

const nombresProductos = tiposUnicos;

const productosPorTipo = tiposUnicos.reduce((acc, tipo) => {
  acc[tipo] = productos.filter(producto => producto.constructor.tipo() === tipo);
  return acc;
}, {});

console.log(nombresProductos);
console.log(productosPorTipo);

export { nombresProductos, productosPorTipo };


