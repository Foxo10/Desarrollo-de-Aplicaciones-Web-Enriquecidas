'use strict';

const cacheName = 'v1';
const offlineUrl = './offline-page.html';

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(resources);
  /* Incluir la siguiente linea para evitar el siguiente error:
    "The FetchEvent for resulted in a network error response: a redirected response was used 
    for a request whose redirect mode is not "follow"."
  */
  fetch(offlineUrl).then(response => cache.put(offlineUrl, new Response(response.body)));
};

this.addEventListener('install', event => {
  event.waitUntil( 
    addResourcesToCache([
      offlineUrl,
      "./img/offline.svg",
    ]),
  );

});

const putInCache = async (request, response) => {
    const cache = await caches.open(cacheName);
    await cache.put(request, response);
};

const cacheFirst = async ({ request, fallbackUrl }) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache;
    }

    try {
        const responseFromNetwork = await fetch(request);
        // Descomentar esta linea si queremos meter en cache cualquier recurso que nos descarguemos
        //putInCache(request, responseFromNetwork.clone());
        return responseFromNetwork;
    } catch (error) {
        const fallbackResponse = await caches.match(fallbackUrl); 
        if (fallbackResponse) {
            return fallbackResponse;
        }
        return new Response("Network error happened", {status: 408, headers: { "Content-Type": "text/plain" }});
    }
};

this.addEventListener('fetch', event => {
	event.respondWith( cacheFirst({
		'request': event.request,
		'fallbackUrl': offlineUrl
	}));
});