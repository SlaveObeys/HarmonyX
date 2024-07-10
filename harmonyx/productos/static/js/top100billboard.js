// CREAMOS UNA PROMESA CON FETCH PARA OBTENER LOS 100 TIPOS DEL BILLBOARD 😎

// ELEMENTOS DEL MODAL ALERTA
const alertModalPanel = document.getElementById('alert-modal');
const btnAlertModalAccept = document.getElementById('btnAlertModalAccept');
const alertTitle = document.getElementById('alert-title');
const alertMessage = document.getElementById('alert-message');

// FUNCION PARA ACTIVAR EL MODALALERT Y PASARLE EL TITULO Y SU MENSAJE A ESTA FUNCTION 😁
function openAlertModalPanel(titulo, mensaje) {
    console.log(titulo);
    alertTitle.textContent = titulo;
    alertMessage.textContent = mensaje;
    alertModalPanel.classList.remove('hidden');
    setTimeout(() => {
        alertModalPanel.classList.add('show');
    }, 10);
}

// CERRAMOS EL MODAL
function closeAlertModalPanel() {
    alertModalPanel.classList.remove('show');
    setTimeout(() => {
        alertModalPanel.classList.add('hidden');
    }, 250);
}
// AGREGAMOS EL LISTENER AL BOTON ACEPTAR PARA CERRAR EL MODAL
btnAlertModalAccept.addEventListener('click', closeAlertModalPanel);

fetch('https://desarrollo.codemaker.cl/api/billboard.php?billboard=top100')
    .then(response => {
        if (!response.ok) {
            //openAlertModalPanel('¡Error inesperado!', 'No se realizó la carga de los Top 100 Billboard 😢');
            throw new Error('Error al obtener los 100 top billboard, revisa el error por favor');
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos recibidos: ', data);
        const tableBody = document.getElementById('table-body-top-100');
        // RECORREMOS EL JSON OBTENIDO DE LA API Y AGREGAMOS AL HTML CADA
        data.forEach(element => {
            const row = document.createElement('tr');
            row.classList.add('bg-light-black', 'text-white');

            const rankingCell = document.createElement('td');
            rankingCell.textContent = element.rank;
            rankingCell.classList.add('text-sm', 'font-medium', 'border-b', 'px-4', 'py-4');
            row.appendChild(rankingCell);

            const artistCell = document.createElement('td');
            artistCell.textContent = element.artist;
            artistCell.classList.add('text-sm', 'font-medium', 'border-b', 'px-8', 'py-4', 'whitespace-nowrap');
            row.appendChild(artistCell);

            const songCell = document.createElement('td');
            songCell.textContent = element.song;
            songCell.classList.add('text-sm', 'font-medium', 'border-b', 'px-4', 'py-4');
            row.appendChild(songCell);

            tableBody.appendChild(row);
        });

        //openAlertModalPanel('¡Éxito!', 'Top 100 Billboard obtenidos exitosamente');        
    })
    .catch(error => {
        console.log('Error petición: ', error);
        alertTitle.classList.remove('text-green');
        alertTitle.classList.add('text-red')
        openAlertModalPanel('¡Error inesperado!', 'Hubo un inconveniente al realizar la petición 😢');
    });