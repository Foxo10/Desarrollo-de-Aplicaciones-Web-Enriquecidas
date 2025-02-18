import Producto from './producto.js';

class Cambio extends Producto {
  constructor(nombre, precio, tecnologia) {
    super(nombre, precio);
    this._tecnologia = tecnologia;
  }

  get tecnologia() {
    return this._tecnologia;
  }

  set tecnologia(tecnologia) {
    this._tecnologia = tecnologia;
  }

  static tipo() {
    return 'Cambio';
  }
}

export default Cambio;
