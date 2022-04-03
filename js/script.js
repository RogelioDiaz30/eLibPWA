//Service Worker
let swRegistration = null;
//Comprobar si existe Servidor Worker en el navegador
if('serviceWorker' in navigator){
    console.log("Puedes usar el Service Worker")
    //registrar el Service Worker "sw.js"
    navigator.serviceWorker.register('./sw.js')
        .then(res => {
            console.log('Service Worker cargado correctamente', res)
            swRegistration = res
            displayNotification();
    })
        .catch(err => console.log('SW no se ha podido registrar', err));
}else{
    console.log("No esta disponible el Service Worker")
}

  
  function displayNotification() {
    if (window.Notification && Notification.permission === "granted") {
      notification();
    }
    else if (window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission(status => {
        if (status === "granted") {
          notification();
        } else {
          alert("Haz rechazado los permisos.");
        }
      });
    } else {
      alert(
        "Haz rechazado los permisos. Porfavor habilitalos en la configuracion."
      );
    }
  }
  
  function notification() {
    const options = {
      body: "Esta es una notificacion",
      icon: "./img/bell.png"
    };
    swRegistration.showNotification("Notificacion", options);
  }