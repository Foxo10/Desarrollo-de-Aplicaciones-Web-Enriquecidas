importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.1/workbox-sw.js');

if (workbox) {
    // Precaching: guardamos en caché todo lo que necesitemos
    workbox.precaching.precacheAndRoute([
        { url: '/css/styles.css', revision: null },
        { url: '/offline.html', revision: null },
        { url: '/index.html', revision: null },
        { url: '/js/main.mjs', revision: null },
        { url: '/js/tienda.mjs', revision: null },
        { url: '/js/gestor.mjs', revision: null },
        { url: '/js/producto.mjs', revision: null },
        { url: '/js/agricola.mjs', revision: null },
        { url: '/js/deportivo.mjs', revision: null },
        { url: '/js/mueble.mjs', revision: null },

    ]);

    // Estrategia por defecto: intentar descargar el recurso
    workbox.routing.setDefaultHandler(new workbox.strategies.NetworkOnly());
    // Estrategia por defecto ante pérdida de conexión: mostrar offline.html
    workbox.recipes.offlineFallback({pageFallback: '/offline.html'});

    // Conseguir de la cache los ficheros .css y .js
    workbox.routing.registerRoute(
        /\.(?:css|js)$/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'mi-aplicacion' 
        })
    )
}