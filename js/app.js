import { mascotaInput, propietarioInput, telefonoInput,fechaInput, horaInput, sintomasInput, formulario } from './selectores.js';
import  { datosCita, nuevaCita } from './funciones.js'

window.onload =  function () {
  mascotaInput.addEventListener('input', datosCita);
  propietarioInput.addEventListener('input', datosCita);
  telefonoInput.addEventListener('input', datosCita);
  fechaInput.addEventListener('input', datosCita);
  horaInput.addEventListener('input', datosCita);
  sintomasInput.addEventListener('input', datosCita);

  formulario.addEventListener('submit', nuevaCita);
}

