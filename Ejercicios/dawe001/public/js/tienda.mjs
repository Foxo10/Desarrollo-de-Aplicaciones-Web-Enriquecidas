import Agricola from './agricola.mjs';
import Deportivo from './deportivo.mjs';
import Mueble from './mueble.mjs';

const productos = [
    new Agricola("Zanahoria", 0.5, "Granja del Tío Pepe"),
    new Agricola("Manzana", 2, "Granja del Tío Pepe"),
    new Agricola("Pera", 2.5, "Granja del Tío Pepe"),
    new Agricola("Cebolla", 0.75, "Granja del Tío Pepe"),
    new Agricola("Lechuga", 1, "Isabelen Baserria"),
    new Agricola("Remolacha", 1.2, "Isabelen Baserria"),
    new Agricola("Ajo", 1.5, "Isabelen Baserria"),
    new Agricola("Ajo", 0.89, "Joxe Mariren Baserria"),
    new Agricola("Pepino", 2.99, "Joxe Mariren Baserria"),
    new Agricola("Calabacín", 1.99, "El Bach-erri"),
    new Agricola("Calabaza", 4.99, "El Bach-erri"),

    new Deportivo("Balón de fútbol", 20, "Naiki"),
    new Deportivo("Multi tacos", 30, "Ribuk"),
    new Deportivo("Raqueta de tenis", 50, "Wilson"),
    new Deportivo("Gafas de natación", 15, "Spido"),
    new Deportivo("Gorra para el sol", 10, "Naiki"),
    new Deportivo("Gorra de natacion", 5, "Arena"),
    new Deportivo("Calzado para correr", 100, "Addydas"),
    
    new Mueble("Mesilla de Noche", 50, "Muebles de la Abuelita"),
    new Mueble("Armario empotrado", 1500, "Muebles de la Abuelita"),
    new Mueble("Escritorio estudiamucho", 500, "Muebles de la Abuelita"),
    new Mueble("Estanteria ayquesecae", 300, "Ebanisto el Manitas"),
    new Mueble("Sofa Piesparaqueosquiero", 800, "Ebanisto el Manitas"),
];

const tiposDeProductos = [
    Agricola.nombreTipoProducto(),
    Deportivo.nombreTipoProducto(),
    Mueble.nombreTipoProducto(),
];

const listaProductosPorTipo = [
    productos.filter(producto => producto instanceof Agricola),
    productos.filter(producto => producto instanceof Deportivo),
    productos.filter(producto => producto instanceof Mueble)
];

export { tiposDeProductos, listaProductosPorTipo };
