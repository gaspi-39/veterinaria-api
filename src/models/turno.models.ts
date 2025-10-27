export type Fecha = { dia: number; mes: number; anio: number };

export class Turno {
  id: number;
  petId: number;
  case: string;
  fecha: Fecha = {
    dia: 0,
    mes: 0,
    anio: 0,
  };

  constructor(data: Turno) {
    this.id = Date.now();
    this.petId = data.petId;
    this.case = data.case;
    this.fecha = data.fecha;
  }
}
