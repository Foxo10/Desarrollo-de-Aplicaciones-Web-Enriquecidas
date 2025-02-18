import Producto from './producto.js';

class Rueda extends Producto {
  constructor(nombre, precio, fabricante) {
    super(nombre, precio);
    this._fabricante = fabricante;
  }

  get fabricante() {
    return this._fabricante;
  }

  set fabricante(fabricante) {
    this._fabricante = fabricante;
  }

  static tipo() {
    return 'Rueda';
  }
}

export default Rueda;
