const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput =document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');



const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

class Citas {
  constructor() {
    this.citas = [];
  }

  agregarCita(cita) {
    this.citas = [...this.citas, cita];
    
  }
}

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

  imprimirCitas({ citas }) {
    this.limpiarHTML()

    citas.forEach(cita => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
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

      // Agregar los parrafos al divCita
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);

      // Agregar las citas al HTML
      contenedorCitas.appendChild(divCita);
    })
  }

  limpiarHTML() {
    while(contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

const ui = new UI();
const administrarCitas = new Citas();


eventListeners();

function eventListeners() {
  mascotaInput.addEventListener('input', datosCita);
  propietarioInput.addEventListener('input', datosCita);
  telefonoInput.addEventListener('input', datosCita);
  fechaInput.addEventListener('input', datosCita);
  horaInput.addEventListener('input', datosCita);
  sintomasInput.addEventListener('input', datosCita);

  formulario.addEventListener('submit', nuevaCita);
}

const citaObj = {
  mascota: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora: '',
  sintomas: ''
}


function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

// Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
  e.preventDefault();

  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

  // Validar
  if ( !mascota || !propietario || !telefono || !fecha || !hora || !sintomas) {
    ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

    console.log('Todos los campos son obligatorios');
  }

  // Generar un id unico
  citaObj.id = Date.now();

  // Creando una nueva cita
  administrarCitas.agregarCita({...citaObj});
  
  // Reiniciar el objeto para la validacion
  reiniciarObjeto();

  // Reiniciar el formulario
  formulario.reset();

  // Mostrar el HTMl de las citas
  ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto() {
  citaObj.mascota = '';
  citaObj.propietario = '';
  citaObj.telefono = '';
  citaObj.fecha = '';
  citaObj.hora = '';
  citaObj.sintomas = '';
}