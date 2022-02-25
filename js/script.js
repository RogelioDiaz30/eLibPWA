//Service Worker
//Comprobar si existe Servidor Worker en el navegador
if('serviceWorker' in navigator){
    console.log("Puedes usar el Service Worker")
    //registrar el Service Worker "sw.js"
    navigator.serviceWorker.register('./sw.js')
        .then(res => console.log('Service Worker cargado correctamente', res))
        .catch(err => console.log('SW no se ha podido registrar', err));
}else{
    console.log("No esta disponible el Service Worker")
}