import { Injectable, NotFoundException } from '@nestjs/common';
import { error } from 'console';
import * as fs from 'fs';
import {
  getDate,
  validateDate,
  verifyId,
  verifyTurnoId,
} from 'src/helpers/helpers';
import { Turno } from 'src/models/turno.models';
const ruta =
  'C:/Users/lazar/OneDrive/Documentos/TECDA/1er año/EDI/veterinaria-api/src/db/data.json';

@Injectable()
export class TurnosService {
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
  getTurno(): any {
    try {
      const data = this.read();
      return data.turnos;
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
  createTurno(body: Turno): any {
    try {
      const data = this.read();
      const veridyDate = validateDate(body.fecha);
      const verifyPetId = verifyId(data, body.petId);
      if (veridyDate && verifyPetId) {
        let turno = new Turno(body);
        data.turnos.push(turno);
        this.write(data);
        return { data: data, msg: 'Turno creado exitosamente' };
      }
      throw new NotFoundException('Datos no válidos');
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
  deleteTurno(id: number): any {
    const data = this.read();
    const check = verifyTurnoId(data, id);
    if (check) {
      const index = data.turnos.findIndex((t) => t.id === id);
      data.turnos.splice(index, 1);
    }
    throw new NotFoundException('ID no válida');
  }
  getPetsSinTurno(): any {
    const data = this.read();

    if (!data.pets || data.pets.length === 0) {
      return { msg: 'No hay mascotas registradas', pets: [] };
    }

    const petsConTurnoIds = (data.turnos || []).map((turno) => turno.petId);

    const petsSinTurno = data.pets.filter(
      (pet) => !petsConTurnoIds.includes(pet.id),
    );

    if (petsSinTurno.length === 0) {
      return { msg: 'Todas las mascotas tienen turno agendado', pets: [] };
    }

    return { msg: 'Mascotas sin turno agendado', pets: petsSinTurno };
  }
}
