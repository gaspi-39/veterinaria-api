import { IsString, IsEmail, Length, IsNumber, IsEmpty } from 'class-validator';
import * as fs from 'fs';
import { HistorialMedico } from './history.models';
type PetDTO = { name: string; ownerDni: number; type: string };
export class Pet {
  id: number;
  name: string;
  type: string;
  ownerDni: number;
  history: HistorialMedico;

  constructor(data: PetDTO) {
    this.id = Date.now();
    this.name = data.name;
    this.type = data.type;
    this.ownerDni = data.ownerDni;
    this.history = new HistorialMedico();
  }
}
