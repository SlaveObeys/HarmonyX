// Esta función nos permite cargar la fuente de texto primero y luego mostrar la página al usuario
document.addEventListener("DOMContentLoaded", function () {
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      document.body.style.opacity = '1';
    });
  } else {
    setTimeout(function () {
      document.body.style.opacity = '1';
    }, 10);
  }

  let mensajeDiv = document.getElementById('idMensajes');
  if (mensajeDiv != null) {
    let mensaje = mensajeDiv.textContent.trim();
    if (mensaje === '') {
      mensajeDiv.style.display = 'none';
    } else {
      setTimeout(function () {
        mensajeDiv.style.transition = 'opacity 1s';
        mensajeDiv.style.opacity = '0';
        setTimeout(function () {
          mensajeDiv.style.display = 'none';
        }, 1000);
      }, 4000);
    }
  }
});