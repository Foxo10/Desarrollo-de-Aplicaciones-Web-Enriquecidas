import Producto from './producto.js';

class Cuadro extends Producto {
  constructor(nombre, precio, estilo) {
    super(nombre, precio);
    this._estilo = estilo;
  }

  get estilo() {
    return this._estilo;
  }

  set estilo(estilo) {
    this._estilo = estilo;
  }

  static tipo() {
    return 'Cuadro';
  }
}

export default Cuadro;
