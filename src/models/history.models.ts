import { getDate } from 'src/helpers/helpers';
import { Fecha } from './turno.models';

export type Diagnostico = {
  fecha: Fecha;
  descripcion: string;
};

export type Vacuna = {
  nombre: string;
  fecha: Fecha;
  proxima?: Fecha;
};

export type Tratamiento = {
  nombre: string;
  duracionDias: number;
};

export class HistorialMedico {
  diagnosticos: Diagnostico[];
  vacunas: Vacuna[];
  tratamientos: Tratamiento[];

  constructor() {
    this.diagnosticos = [];
    this.vacunas = [];
    this.tratamientos = [];
  }

  // Registrar nuevo diagnóstico

  // Registrar vacuna aplicada
  registrarVacuna(nombre: string, fecha: Fecha = getDate(), proxima?: Fecha) {
    this.vacunas.push({ nombre, fecha, proxima });
  }

  // Registrar tratamiento

  // Consultar historial completo
  obtenerResumen() {
    return {
      diagnosticos: this.diagnosticos,
      vacunas: this.vacunas,
      tratamientos: this.tratamientos,
    };
  }
}
