import { IsString, IsEmail, Length, IsNumber, IsEmpty } from 'class-validator';
import * as fs from 'fs';
type PetDTO = { name: string; ownerDni: number; type: string };
// type History = {tratamientos: Tratamientos}
// type Tratamientos = {nombre: string, duracion: number}
// type Vacunas = {}

export class Pet {
  id: number;
  name: string;
  type: string;
  ownerDni: number;

  constructor(data: PetDTO) {
    this.id = Date.now();
    this.name = data.name;
    this.ownerDni = data.ownerDni;
    this.type = data.type;
  }
}
