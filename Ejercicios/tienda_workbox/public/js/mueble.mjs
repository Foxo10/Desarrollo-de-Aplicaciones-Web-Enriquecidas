import Producto from "./producto.mjs";

export default class Mueble extends Producto{
    constructor(nombre, precio, fabricante){
        super(nombre, precio);
        this._fabricante = fabricante;
    }
    get fabricante(){
        return this._fabricante;
    }
    set fabricante(fabricante_nuevo){
        this._fabricante = fabricante_nuevo;
    }
    static nombreTipoProducto(){
        return "Muebles";

    }
    
}
