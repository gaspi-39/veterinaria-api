import { getDate } from 'src/helpers/helpers';
import { Fecha } from './turno.models';

export type Diagnostico = {
  id: number;
  fecha: Fecha;
  descripcion: string;
};

export type Vacuna = {
  id: number;
  nombre: string;
  fecha: Fecha;
  proxima?: Fecha;
};

export type Tratamiento = {
  id: number;
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
}
