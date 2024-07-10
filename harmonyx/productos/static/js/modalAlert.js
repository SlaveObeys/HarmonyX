document.addEventListener('DOMContentLoaded', function () {
    // ELEMENTOS DEL FORMULARIO SUSCRIBIRSE A OFERTAS Y DESCUENTOS
    const formEmailSuscribe = document.getElementById('formEmailSuscribe');
    const emailInputFormEmailSuscribe = document.getElementById('emailInputFormEmailSuscribe');

    // ELEMENTOS DEL FORMULARIO CONTACTO
    const formContacto = document.getElementById('formContacto');
    const inputName = document.getElementById('input-name');
    const inputEmail = document.getElementById('input-email');
    const inputMessage = document.getElementById('input-message');

    // ELEMENTOS DEL MODAL ALERTA
    const alertModalPanel = document.getElementById('alert-modal');
    const btnAlertModalAccept = document.getElementById('btnAlertModalAccept');
    const alertTitle = document.getElementById('alert-title');
    const alertMessage = document.getElementById('alert-message');

    // EVENTO CUANDO SE ENVÍE EL FORMULARIO DE CONTACTO
    formContacto.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = inputName.value;
        const email = inputEmail.value;
        const message = inputMessage.value;

        if (name && email && message) {
            alertTitle.textContent = "¡Mensaje Enviado!";
            alertMessage.textContent = "Tu mensaje ha sido enviado exitosamente, nos pondremos en contacto pronto 😁";
        } else {
            alertTitle.textContent = "¡Error!";
            alertMessage.textContent = "Tu mensaje no ha sido enviado, verifica que hayas ingresado los datos correctamente 😢";
        }
        openAlertModalPanel();
        inputName.value = '';
        inputEmail.value = '';
        inputMessage.value = '';
    });

    // EVENTO CUANDO SE ENVÍE EL FORMULARIO DE SUSCRIPCION
    formEmailSuscribe.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = emailInputFormEmailSuscribe.value;

        if (email) {
            alertTitle.textContent = "¡Suscripción Exitosa!";
            alertMessage.textContent = "Tu correo ha sido ingresado y registrado a nuestras ofertas y descuentos 😎";
        } else {
            alertTitle.textContent = "Email Inválido";
            alertMessage.textContent = "Debes ingresar un correo válido para suscribirte a nuestras ofertas y descuentos 😠";
        }

        openAlertModalPanel();
        emailInputFormEmailSuscribe.value = '';
    });

    // Función para abrir el modal
    function openAlertModalPanel() {
        // Mostrar el modal con animación
        alertModalPanel.classList.remove('hidden');
        setTimeout(() => {
            alertModalPanel.classList.add('show');
        }, 10);
    }

    // Función para cerrar el modal
    function closeAlertModalPanel() {
        alertModalPanel.classList.remove('show');
        setTimeout(() => {
            alertModalPanel.classList.add('hidden');
        }, 250);
    }

    // Agregamos el listener a los botones del modal
    btnAlertModalAccept.addEventListener('click', closeAlertModalPanel);
});