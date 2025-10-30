import { Fecha } from 'src/models/turno.models';
import { getDate } from './helpers';

export function registrarVacuna(
  nombre: string,
  fecha: Fecha = getDate(),
  proxima?: Fecha,
) {
  return { nombre, fecha, proxima };
}
export function agregarDiagnostico(
  descripcion: string,
  fecha: Fecha = getDate(),
) {
  return { descripcion, fecha };
}
export function registrarTratamiento(nombre: string, duracionDias: number) {
  return { nombre, duracionDias };
}
