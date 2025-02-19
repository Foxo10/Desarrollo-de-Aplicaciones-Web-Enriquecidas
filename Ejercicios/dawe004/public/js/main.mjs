import { tiposDeProductos, listaProductosPorTipo } from './tienda.mjs';
import Agricola from './agricola.mjs';
import Deportivo from './deportivo.mjs';
import Mueble from './mueble.mjs';

function renderizarProductos(contenedor, listaProductos) {
    listaProductos.forEach((producto) => {
        contenedor.innerHTML += imprimirProductoHTML(producto);
    });
}

function imprimirProductoHTML(producto) {
    let tipoProducto = '';
    if (producto instanceof Agricola) {
        tipoProducto = 'Origen:';
    } else if (producto instanceof Deportivo) {
        tipoProducto = 'Marca:';
    } else if (producto instanceof Mueble) {
        tipoProducto = 'Fabricante:';
    }

    return `
        <div class="producto">
            <div class="titulo">${producto.nombre}</div>
            <div><span>Precio:</span> ${producto.precio}€</div>
            <div><span>${tipoProducto}</span> ${producto.origen || producto.marca || producto.fabricante}</div>
            <div>
            <button class="comprar-btn" disabled>Comprar</button>
            <input type="number" class="spinner" value="0" min="0" max="9">
            </div>
        </div>
    `;
}

function gestorEventos(){
    const botones = document.querySelectorAll('.comprar-btn');
    const spinners = document.querySelectorAll('.spinner');

    spinners.forEach((spinner) => {
        spinner.addEventListener('change', function() {
            const valorSpinner = parseInt(spinner.value);

            const boton = spinner.parentElement.querySelector('.comprar-btn');

            if (valorSpinner >= 1 && valorSpinner <= 9) {
                boton.disabled = false;
                boton.style.color = 'black';
                boton.style.backgroundColor = 'rgb(190, 188, 188)';
                boton.textContent = `Comprar ${valorSpinner}`;
            }
            else {
                boton.disabled = true;
                boton.style.color = '';
                boton.style.backgroundColor = '';
                boton.textContent = `Comprar`;
            }
        });

    });

    botones.forEach((boton) => {
        boton.addEventListener('click', function() {
            const productoElement = boton.closest('.producto'); 
            const nombreProducto = productoElement.querySelector('.titulo').textContent.trim();

            let producto = null;
            for (const listaProductos of listaProductosPorTipo) {
                producto = listaProductos.find(p => p.nombre === nombreProducto);
                if (producto) break;
            }

            if (producto) {
                const cantidad = parseInt(boton.textContent.split(' ')[1]);
                boton.disabled = true;
                boton.style.color = '';
                boton.style.backgroundColor = '';
                boton.textContent = `Comprar`;
                agregarAlCarrito(producto, cantidad);
            } else {
                console.error('Producto no encontrado:', nombreProducto);
            }
        });
    });

    var carrito = document.getElementById('carrito-container');
    carrito.addEventListener('mouseenter', () => {
        carrito.style.width = '18%'; 
    });
    
    carrito.addEventListener('mouseleave', () => {
        carrito.style.width = ''; 
    });


}

function agregarAlCarrito(producto, cantidad) {
    let segundoAtributo = '';
    if (producto instanceof Agricola) {
        segundoAtributo = 'Origen:';
    } else if (producto instanceof Deportivo) {
        segundoAtributo = 'Marca:';
    } else if (producto instanceof Mueble) {
        segundoAtributo = 'Fabricante:';
    }
    // Reseteo de spinners, más facil que buscar uno especifico
    const spinners = document.querySelectorAll('.spinner');
    spinners.forEach(spinner => {
        spinner.value = 0;
    });

    const carrito = document.getElementById('carrito-container');
    const productosEnCarrito = carrito.querySelectorAll('.producto-carrito');
    const nuevoProductoCarrito = document.createElement('div');

    // Comprobar si es producto nuevo en el carrito o no
    let productoEnCarrito = null;
    productosEnCarrito.forEach(prodCarrito => {
        var nombre = prodCarrito.querySelector('.nombre').textContent;
        var atributoEspecial = prodCarrito.querySelector('.atributo').textContent;
        var precio = prodCarrito.querySelector('.precio').textContent;
        
        console.log('Nombre:', nombre);
        console.log('Segundo Atributo:', atributoEspecial);
        console.log('Precio:', precio);

        console.log(segundoAtributo);

        

        let segundoAtributoValor = '';
        if (segundoAtributo === 'Origen:') {
            segundoAtributoValor = producto.origen;
        } else if (segundoAtributo === 'Marca:') {
            segundoAtributoValor = producto.marca;
        } else if (segundoAtributo === 'Fabricante:') {
            segundoAtributoValor = producto.fabricante;
        }

        console.log(segundoAtributoValor);


        if (nombre === producto.nombre && atributoEspecial.split(':')[1].trim() === segundoAtributoValor) {
            console.log("producto que ya esta en el carrito");
            productoEnCarrito = prodCarrito;
            return;
        }
    });


    let cantidadTotal = cantidad;
    if (productoEnCarrito != null) {
        var cantidadNombre = productoEnCarrito.querySelector('span').textContent;
        const cantidadAnterior = parseInt(cantidadNombre.split('x')[0]);
        cantidadTotal += cantidadAnterior;
        console.log(cantidadTotal);
    }

    if (cantidadTotal > 9) {
        alert('No puedes agregar más de 9 unidades de un producto al carrito.');
        return;
    }
    else{
        console.log(cantidadTotal);
        console.log(productoEnCarrito);
        // si ya esta en el carrito actualizamos la cantidad
        if (productoEnCarrito != null) {
            var cantidadNombreElement = productoEnCarrito.querySelector('span');
            var cantidadNombreTexto = cantidadNombreElement.textContent;
            var nuevoTexto = cantidadNombreTexto.replace(/^(\d+)/, cantidadTotal);
            cantidadNombreElement.textContent = nuevoTexto;
            console.log("producto actualizado");
        } 
        else {
            // si no está en el carrito, lo agregamos
            nuevoProductoCarrito.classList.add('producto-carrito');

            const cantidadProducto = document.createElement('span');
            cantidadProducto.textContent = `${cantidad}x ${producto.nombre}:`;
            cantidadProducto.style.fontWeight = 'bold';
            nuevoProductoCarrito.appendChild(cantidadProducto);

            // Crear elemento para el nombre del producto
            const nombreProducto = document.createElement('div');
            nombreProducto.classList.add('nombre');
            nombreProducto.textContent = producto.nombre;
            nuevoProductoCarrito.appendChild(nombreProducto);

            // Crear elemento para el segundo atributo del producto
            const segundoAtributoElement = document.createElement('div');
            segundoAtributoElement.classList.add('atributo'); 
            segundoAtributoElement.textContent = `${segundoAtributo} ${producto.origen || producto.marca || producto.fabricante}`;
            nuevoProductoCarrito.appendChild(segundoAtributoElement);

            const precioProducto = document.createElement('div');
            nombreProducto.classList.add('precio');
            precioProducto.textContent = `Precio: ${producto.precio}€`;
            nuevoProductoCarrito.appendChild(precioProducto);

            carrito.appendChild(nuevoProductoCarrito);
            console.log("añadido al carrito primera vez");

            nuevoProductoCarrito.addEventListener('mouseenter', () => {
                nuevoProductoCarrito.style.backgroundColor = '#3356f3';
                nuevoProductoCarrito.style.color = 'white';

            });

            nuevoProductoCarrito.addEventListener('mouseleave' , () => {
                nuevoProductoCarrito.style.backgroundColor = '';
                nuevoProductoCarrito.style.color = '';

            });
        }
    }
    carrito.style.visibility = 'visible';

    
}

window.onload = () => {
    const contenedorProductosAgricolas = document.getElementById('productos-agricolas');
    const contenedorProductosDeportivos = document.getElementById('productos-deportivos');
    const contenedorMuebles = document.getElementById('muebles');

    const columnas = [contenedorProductosAgricolas, contenedorProductosDeportivos, contenedorMuebles];
    columnas.forEach((columna, index) => {
        const titulo = document.createElement('h2');
        titulo.textContent = tiposDeProductos[index];
        columna.appendChild(titulo);
    });
    

    renderizarProductos(contenedorProductosAgricolas, listaProductosPorTipo[0]);
    renderizarProductos(contenedorProductosDeportivos, listaProductosPorTipo[1]);
    renderizarProductos(contenedorMuebles, listaProductosPorTipo[2]);

    gestorEventos();

};
