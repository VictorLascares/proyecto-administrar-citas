import UI from './classes/UI.js';
import Citas from './classes/Citas.js';
import { formulario, mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput } from './selectores.js';

let editando;

const ui = new UI();
const administrarCitas = new Citas();


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
    return;
  }

  if(editando) {
    ui.imprimirAlerta('Cita editada correctamente');

    // Pasar el objeto de la cita a edicion
    administrarCitas.editarCita({...citaObj})

    // Regresar el texto del boton a sus estado original
    formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

    // Quitar modo edición
    editando = false;
  } else {
    // Generar un id unico
    citaObj.id = Date.now();

    // Creando una nueva cita
    administrarCitas.agregarCita({ ...citaObj });

    // Mensaje de agregada correctamente
    ui.imprimirAlerta('Cita agregada correctamente');
  }
  
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

function eliminarCita(id) {
  // Eliminar la cita
  administrarCitas.eliminarCita(id);

  // Mostrar un mensaje
  ui.imprimirAlerta('Cita eliminada correctamente')

  // Refrescar las citas
  ui.imprimirCitas(administrarCitas)
}

function cargarEdicion(cita) {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
 
  // Llenar los inputs
  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  // Llenar el objeto
  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  // Cambiar el texto del boton submit
  formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

  editando = true;
}

export { datosCita, nuevaCita, reiniciarObjeto, eliminarCita, cargarEdicion  };
