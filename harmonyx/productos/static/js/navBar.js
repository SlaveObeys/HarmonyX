// Esta función controla el boton para abrir el dropdown para visualizar la lista de páginas al usar la web con móvil
document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('buttonDropdownMenuMobile');
    const menuDropdown = document.getElementById('menu-mobile-dropdown');
    const iconOpen = menuButton.querySelector('svg.block');
    const iconClose = menuButton.querySelector('svg.hidden');

    menuButton.addEventListener('click', function () {
        const isOpen = menuDropdown.classList.toggle('hidden');
        if (!isOpen) {
            console.log("icon open se oculta");
            console.log("icon close se inicia");
            iconOpen.classList.remove('block');
            iconOpen.classList.add('hidden');
            iconClose.classList.remove('hidden');
            iconClose.classList.add('block');
        } else {
            iconOpen.classList.remove('hidden');
            iconOpen.classList.add('block');
            iconClose.classList.remove('block');
            iconClose.classList.add('hidden');
        }
    });
});

// Activar o desactivar dropdownProfile cuando se presiona el botón
document.getElementById('btnProfile').addEventListener('click', function (event) {
    var dropdown = document.getElementById('dropdownProfile');
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        setTimeout(function () {
            dropdown.style.display = 'none';
        }, 100);
    } else {
        dropdown.style.display = 'block';
        setTimeout(function () {
            dropdown.classList.add('show');
        }, 10);
    }
    event.stopPropagation();
});
// Funcion la cual verifica si se a presionado fuera del btnProfile o del dropdown
document.addEventListener('click', function (event) {
    var dropdown = document.getElementById('dropdownProfile');
    var button = document.getElementById('btnProfile');
    if (!dropdown.contains(event.target) && !button.contains(event.target)) {
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
            setTimeout(function () {
                dropdown.style.display = 'none';
            }, 100);
        }
    }
});