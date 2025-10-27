import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { getDate, validateDate, verifyId } from 'src/helpers/helpers';
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
    const data = this.read();
    return data.turnos;
  }
  createTurno(body: Turno): any {
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
  }
}
