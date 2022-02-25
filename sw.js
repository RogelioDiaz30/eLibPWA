//Asignar Nombre y version de la Caché
const CACHE_NAME = 'PWA-ELIB';

//Archivos para Caché de la aplicacion
var urlsToCache = [
    './',
    './js/script.js',
    './js/jquery.min.js',
    './js/parallax.js',
    './js/efectos.js',
    './css/estilos.css',
    './img/acerca-de.jpg',
    './img/bg1.jpeg',
    './img/favicon/favicon.png',
    './img/favicon/favicon-1024.png',
    './img/favicon/favicon-512.png',
    './img/favicon/favicon-384.png',
    './img/favicon/favicon-256.png',
    './img/favicon/favicon-192.png',
    './img/favicon/favicon-128.png',
    './img/favicon/favicon-96.png',
    './img/favicon/favicon-64.png',
    './img/favicon/favicon-32.png',
    './img/favicon/favicon-16.png'
];

//Eventos del Service Worker
//Evento install, then --promesa
//self es el service worker
//instalar el  service workerr
//guardar los recuros necesarios
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                    });
            })
            .catch(err => console.log('No se ha registrado el cache: ', err))
    )
});

//Evento activate
//Para que la app funcione sin conexion a internet
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhiteList.indexOf(cacheName) === -1) {
                            //Borrar los elementos que no se necesitan
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                //Activar el cache en el dispositivo
                self.clients.claim();
            })
    );
});

//Evento fetch
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    //devuelve datos desde la cache
                    return res;
                }
                return fetch(e.request);
            })
    );
});