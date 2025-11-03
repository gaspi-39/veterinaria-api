import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  validateHistorial,
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
  createHistory(historial: any, id: number): any {
    const data = this.read();
    let check: boolean = true;
    let msg = 'ok';

    const pet: Pet = data.pets.find((u) => u.id === id);
    if (!pet) throw new NotFoundException('Mascota no encontrada');

    if (
      historial.vacunas &&
      esVacuna(historial.vacunas) &&
      validateDate(historial.vacunas.fecha)
    ) {
      var newId = Date.now();
      pet.history.vacunas.push(
        registrarVacuna(
          newId,
          historial.vacunas.nombre,
          historial.vacunas.fecha,
          historial.vacunas.proxima,
        ),
      );
    } else check = false;

    if (historial.diagnosticos && esDiagnostico(historial.diagnosticos)) {
      var newId = Date.now();
      pet.history.diagnosticos.push(
        agregarDiagnostico(
          newId,
          historial.diagnosticos.descripcion,
          historial.diagnosticos.fecha,
        ),
      );
    } else check = false;

    if (historial.tratamientos && esTratamiento(historial.tratamientos)) {
      var newId = Date.now();

      pet.history.tratamientos.push(
        registrarTratamiento(
          newId,
          historial.tratamientos.descripcion,
          historial.tratamientos.duracionDias,
        ),
      );
    } else check = false;
    if (check === false) {
      msg = 'Hay datos no válidos o campos no ingresados';
    }
    this.write(data);
    return { pet: pet, msg: msg };
  }
  //
  deleteHistory(id: number, campo: string, idCampo: number): any {
    const data = this.read();

    const pet = data.pets.find((p) => p.id === id);
    if (!pet) throw new NotFoundException('ID de mascota no encontrada');

    const camposValidos = ['vacunas', 'tratamientos', 'diagnosticos'];
    if (!camposValidos.includes(campo)) {
      throw new BadRequestException(`Campo "${campo}" no es válido`);
    }

    pet.history = pet.history || {};
    pet.history[campo] = Array.isArray(pet.history[campo])
      ? pet.history[campo]
      : [];

    const index = pet.history[campo].findIndex(
      (item: any) => item.id === idCampo,
    );
    if (index === -1) {
      throw new NotFoundException(`No se encontró ${campo} con id ${idCampo}`);
    }

    pet.history[campo].splice(index, 1);

    this.write(data);

    return {
      message: `${campo.slice(0, -1)} eliminado correctamente`,
      pet,
    };
  }
}
