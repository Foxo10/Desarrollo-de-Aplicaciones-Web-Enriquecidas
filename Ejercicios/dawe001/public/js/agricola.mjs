import Producto from './producto.mjs';

export default class Agricola extends Producto{
    constructor(nombre, precio, origen){
        super(nombre, precio);
        this._origen = origen;
    }
    get origen(){
        return this._origen;
    }
    set origen(origen_nuevo){
        this._origen = origen_nuevo;
    }
    static nombreTipoProducto(){
        return "Productos Agrícolas";

    }
    
}