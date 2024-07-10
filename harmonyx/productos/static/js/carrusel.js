document.addEventListener("DOMContentLoaded", function () {
  // Configuración del carrusel
  var slideIndex = 0;
  showSlides();

  // Función para avanzar las diapositivas automáticamente
  function showSlides() {
    var slides = document.getElementsByClassName("slide");

    // Oculta todas las diapositivas
    for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    // Muestra la diapositiva actual con animación
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].style.left = "100%";

    // Animación de desplazamiento
    setTimeout(function () {
      slides[slideIndex - 1].style.left = "0";
    }, 50);

    // Cambia la diapositiva cada 2 segundos (2000 milisegundos)
    setTimeout(showSlides, 3000);
  }
});