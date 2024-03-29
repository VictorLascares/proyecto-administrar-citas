import { eliminarCita, cargarEdicion } from '../funciones.js';
import { contenedorCitas, heading } from '../selectores.js';

class UI {
  imprimirAlerta(mensaje, tipo) {
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
    
    if (tipo === 'error') {
      divMensaje.classList.add('alert-danger');
    } {
      divMensaje.classList.add('alert-success');
    }
    divMensaje.textContent = mensaje;
    document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  imprimirCitas(DB) {
    this.limpiarHTML()

    // Leer el contenido de la base de datos
    const objectStore = DB.transaction('citas').objectStore('citas');

    const fnTextoHeading = this.textoHeading;
    const total = objectStore.count();

    total.onsuccess = function() {
      fnTextoHeading(total.result);
    }

    objectStore.openCursor().onsuccess = function(e) {
      const cursor = e.target.result;

      if (cursor) { 
        const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cursor.value;
        const divCita = document.createElement('div');
        divCita.classList.add('cita', 'p-3');
        divCita.dataset.id = id;

        const mascotaParrafo = document.createElement('h2');
        mascotaParrafo.classList.add('card-title', 'fw-bold');
        mascotaParrafo.textContent = mascota;

        const propietarioParrafo = document.createElement('p');
        propietarioParrafo.innerHTML = `
          <span class="fw-bold">Propietario: </span> ${propietario}
        `;

        const telefonoParrafo = document.createElement('p');
        telefonoParrafo.innerHTML = `
          <span class="fw-bold">Telefono: </span> ${telefono}
        `;

        const fechaParrafo = document.createElement('p');
        fechaParrafo.innerHTML = `
          <span class="fw-bold">Fecha: </span> ${fecha}
        `;

        const horaParrafo = document.createElement('p');
        horaParrafo.innerHTML = `
          <span class="fw-bold">Hora: </span> ${hora}
        `;

        const sintomasParrafo = document.createElement('p');
        sintomasParrafo.innerHTML = `
          <span class="fw-bold">Sintomas: </span> ${sintomas}
        `;

        // Boton para eliminar esta cita
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
        btnEliminar.textContent = 'Eliminar';

        btnEliminar.onclick = () => eliminarCita(id);

        // Boton para editar una cita
        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btn', 'btn-primary');
        btnEditar.textContent = 'Editar';

        const cita = cursor.value;
        btnEditar.onclick = () => cargarEdicion(cita);

        // Agregar los parrafos al divCita
        divCita.appendChild(mascotaParrafo);
        divCita.appendChild(propietarioParrafo);
        divCita.appendChild(telefonoParrafo);
        divCita.appendChild(fechaParrafo);
        divCita.appendChild(horaParrafo);
        divCita.appendChild(sintomasParrafo);
        divCita.appendChild(btnEliminar);
        divCita.appendChild(btnEditar);

        // Agregar las citas al HTML
        contenedorCitas.appendChild(divCita);


        // Ve al siguiente elemento
        cursor.continue();
      }
    }
  }

  textoHeading(resultado) {
    if (resultado > 0) {
      heading.textContent = 'Administra tus citas';
    } else {
      heading.textContent = 'Todavia no hay citas';
    }
  }

  limpiarHTML() {
    while(contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

export default UI;
