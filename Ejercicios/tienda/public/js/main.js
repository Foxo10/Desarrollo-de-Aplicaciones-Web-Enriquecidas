import { nombresProductos, productosPorTipo } from './tienda.js';
import Rueda from './rueda.js';
import Cuadro from './cuadro.js';
import Cambio from './cambio.js';

window.onload = () => {

  function imprimirInfoProducto(producto) {
      const nombre = producto.nombre;
      const precio = producto.precio ? `<strong>Precio:</strong> ${producto.precio}€` : '';
      let extraInfo = '';

      if (producto instanceof Rueda) {
          extraInfo = producto.fabricante ? `<strong>Fabricante:</strong> ${producto.fabricante}` : '';
      } else if (producto instanceof Cuadro) {
          extraInfo = producto.estilo ? `<strong>Estilo de cuadro:</strong> ${producto.estilo}` : '';
      } else if (producto instanceof Cambio) {
          extraInfo = producto.tecnologia ? `<strong>Tecnología:</strong> ${producto.tecnologia}` : '';
      }

      return `
          <div style="border: 1px solid #ddd; margin: 10px; padding: 10px;">
            <div style="font-size: 18px; font-weight: bold; text-decoration: underline;">${nombre}</div>
            ${precio ? `<span>${precio}</span><br>` : ''}
            ${extraInfo ? `<span>${extraInfo}</span>` : ''}
            <input type="number" class="spinner" value="0" min="0" max="9">
            <button class="comprar-btn" disabled>Comprar</button>
          </div>
        `;
  }

  const columnas = document.querySelectorAll('.columna');

  nombresProductos.forEach((tipo, index) => {

    if (columnas[index]) {
          const tipoElement = columnas[index].querySelector('h2');
          tipoElement.innerText = tipo;
          productosPorTipo[tipo].forEach(producto => {
            const productoHTML = imprimirInfoProducto(producto);
            columnas[index].innerHTML += productoHTML;
          });
    } else {
      console.log(`No se encontró la columna ${index}`);
    }
  });

  function cargarGestoresEventos() {
    const botonesComprar = document.querySelectorAll('.comprar-btn');
    const spinners = document.querySelectorAll('.spinner');
    const carrito = document.getElementById('carrito');
    const productosEnCarritoDiv = document.getElementById('productosEnCarrito');

    let carritoProductos = [];

    function handleSpinnerChange(event) {
      const spinnerValue = parseInt(event.target.value);
      const botonComprar = event.target.parentElement.querySelector('.comprar-btn');

      if (spinnerValue >= 1 && spinnerValue <= 9) {
        botonComprar.disabled = false;
        botonComprar.innerText = `Comprar ${spinnerValue}`;
      } else {
        botonComprar.disabled = true;
        botonComprar.innerText = 'Comprar';
      }
    }

    function handleComprarClick(event) {
      const spinner = event.target.parentElement.querySelector('.spinner');
      const cantidad = parseInt(spinner.value);

      if (isNaN(cantidad) || cantidad < 1 || cantidad > 9) {
        alert('Por favor, selecciona una cantidad válida entre 1 y 9.');
        return;
      }

      const productoNombre = event.target.parentElement.querySelector('div').innerText;

      const productoEnCarrito = carritoProductos.find(producto => producto.nombre === productoNombre);

      if (productoEnCarrito) {
        if (productoEnCarrito.cantidad + cantidad <= 9) {
            productoEnCarrito.cantidad += cantidad;
        } else {
          alert('No puedes añadir más de 9 unidades de un producto al carrito.');
          return;
          }
      } else {
        if (cantidad <= 9) {
            carritoProductos.push({
              nombre: productoNombre,
              cantidad,
              precio: event.target.parentElement.querySelector('span').innerText,
              extraInfo: event.target.parentElement.querySelectorAll('span')[1].innerText,
            });
        } else {
          alert('No puedes añadir más de 9 unidades de un producto al carrito.');
          return;
          }
      }

      mostrarCarrito();

      spinner.value = 0;
      event.target.disabled = true;
      event.target.innerText = 'Comprar';
    }

    function mostrarCarrito() {
        productosEnCarritoDiv.innerHTML = '';

        if (carritoProductos.length > 0) {
          document.body.classList.add('carrito-activo');
          carrito.style.visibility = 'visible';
          carritoProductos.forEach(producto => {
            const productoEnCarritoHTML = `
              <div class="producto-carrito">
                <strong>${producto.cantidad}x ${producto.nombre}:</strong><br>
                ${producto.precio}<br>
                ${producto.extraInfo}
              </div>
              `;
            productosEnCarritoDiv.innerHTML += productoEnCarritoHTML;
          });
        } else {
          document.body.classList.remove('carrito-activo');
          carrito.style.visibility = 'hidden';
        }
    }

    carrito.addEventListener('mouseenter', () => {
    carrito.style.width = '250px';
    });

    carrito.addEventListener('mouseleave', () => {
    carrito.style.width = '200px';
    });

    carrito.style.overflowY = 'scroll';
    carrito.style.overflowX = 'hidden';

    spinners.forEach(spinner => {
      spinner.addEventListener('change', handleSpinnerChange);
    });

    botonesComprar.forEach(boton => {
      boton.addEventListener('click', handleComprarClick);
    });
  }

  cargarGestoresEventos();
};