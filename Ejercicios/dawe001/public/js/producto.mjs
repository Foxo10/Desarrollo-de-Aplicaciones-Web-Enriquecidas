export default class Producto {
    constructor(nombre, precio){
        this._nombre = nombre;
        this._precio = precio;

    }
    get nombre(){
        return this._nombre;
    }
    set nombre(nombre_nuevo){
        this._nombre = nombre_nuevo;

    }

    get precio(){
        return this._precio;
    }
    set precio(precio_nuevo){
        this._precio = precio_nuevo;

    }
    
}
