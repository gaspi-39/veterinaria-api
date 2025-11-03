import { Fecha } from 'src/models/turno.models';
import { esDiagnostico, esTratamiento, esVacuna, getDate } from './helpers';

export function registrarVacuna(
  id: number,
  nombre: string,
  fecha: Fecha = getDate(),
  proxima?: Fecha,
) {
  return { id, nombre, fecha, proxima };
}
export function agregarDiagnostico(
  id: number,
  descripcion: string,
  fecha: Fecha = getDate(),
) {
  return { id, descripcion, fecha };
}
export function registrarTratamiento(
  id: number,
  nombre: string,
  duracionDias: number,
) {
  return { id, nombre, duracionDias };
}
export function validateHistorial(data: any) {
  const errores: string[] = [];

  if ('diagnosticos' in data) {
    if (!esDiagnostico(data.diagnosticos)) {
      errores.push('Diagnostico no válido');
    }
  }

  if ('tratamientos' in data) {
    if (!esTratamiento(data.tratamientos)) {
      errores.push('Tratamiento no válido');
    }
  }

  if ('vacunas' in data) {
    if (esVacuna(data.vacunas)) {
      errores.push('Vacuna no válida');
    }
  }

  return errores;
}
