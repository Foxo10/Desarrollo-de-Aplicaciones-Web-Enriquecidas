import Producto from './producto.mjs';

export default class Deportivo extends Producto{
    constructor(nombre, precio, marca){
        super(nombre, precio);
        this._marca = marca;
    }
    get marca(){
        return this._marca;
    }
    set marca(marca_nueva){
        this._marca = marca_nueva;
    }
    static nombreTipoProducto(){
        return "Productos Deportivos";

    }
    
}