import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import {
  esDiagnostico,
  esTratamiento,
  esVacuna,
  validateDate,
  verifyId,
} from 'src/helpers/helpers';
import {
  agregarDiagnostico,
  registrarTratamiento,
  registrarVacuna,
} from 'src/helpers/history.helpers';
import { Pet } from 'src/models/pets.models';
const ruta =
  'C:/Users/lazar/OneDrive/Documentos/TECDA/1er año/EDI/veterinaria-api/src/db/data.json';

@Injectable()
export class HistoryService {
  private read(): any {
    try {
      const data: any = JSON.parse(fs.readFileSync(ruta, 'utf-8'));
      return data;
    } catch (err) {
      throw new NotFoundException(`Error: ${err}`);
    }
  }
  private write(data): any {
    try {
      fs.writeFileSync(ruta, JSON.stringify(data, null, 2));
    } catch (error) {
      throw new NotFoundException(`Error: ${error}`);
    }
  }

  getHistory(): any {
    const data = this.read();
    const historiales = data.pets.map((n) => {
      let output = { pet: n.name, history: n.history };
      return output;
    });
    return historiales;
  }
  getHistoryById(id: number): any {
    const data = this.read();
    let check = verifyId(data, id);
    if (check) {
      const pet = data.pets.find((u) => (u.id = id));
      return { pet: pet.name, history: pet.history };
    }
    throw new NotFoundException('ID no encontrada');
  }
  updateHistory(historial: any, id: number): any {
    const data = this.read();
    let check: boolean = false;

    const pet: Pet = data.pets.find((u) => u.id === id);
    if (!pet) throw new NotFoundException('Mascota no encontrada');

    if (
      historial.vacunas &&
      esVacuna(historial.vacunas) &&
      validateDate(historial.vacunas.fecha)
    ) {
      pet.history.vacunas.push(
        registrarVacuna(
          historial.vacunas.nombre,
          historial.vacunas.fecha,
          historial.vacunas.proxima,
        ),
      );
      check = true;
      // this.write(data);
      //       return { pet: pet.name, history: pet.history };
    }
    if (
      historial.diagnosticos &&
      esDiagnostico(historial.diagnosticos) &&
      validateDate(historial.diagnosticos.fecha)
    ) {
      pet.history.diagnosticos.push(
        agregarDiagnostico(
          historial.diagnosticos.descripcion,
          historial.diagnosticos.fecha,
        ),
      );
      check = true;
    }
    if (historial.tratamientos && esTratamiento(historial.tratamientos)) {
      pet.history.tratamientos.push(
        registrarTratamiento(
          historial.tratamientos.descripcion,
          historial.tratamientos.duracionDias,
        ),
      );
      check = true;
    }
    if (check) {
      this.write(data);
      return { pet: pet.name, history: pet.history };
    } else {
      throw new NotFoundException('Campos no validos, intente nuevamente');
    }
  }
}
