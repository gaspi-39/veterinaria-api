import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/models/users.model';
import * as fs from 'fs';
import * as path from 'path';
import { Pet } from 'src/models/pets.models';
import { verifyId } from 'src/helpers/helpers';
const ruta: string =
  'C:/Users/lazar/OneDrive/Documentos/TECDA/1er año/EDI/veterinaria-api/src/db/data.json';

@Injectable()
export class PetsService {
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
  getPets(): any {
    const data = this.read();
    return data.pets;
  }
  createPet(pet: Pet): any {
    try {
      const data = this.read();
      const newPet: Pet = new Pet(pet);

      if (verifyId(data, newPet.id)) {
        throw new Error(`Esta ID ya está registrada`);
      }

      data.pets.push(newPet);
      this.write(data);
      return { data: data.pets, msg: 'Mascota creada correctamente' };
    } catch (err) {
      throw new NotFoundException(`Error: ${err}`);
    }
  }
  putPet(pet: Pet): any {
    try {
      const data = this.read();
      const index = data.pets.findIndex((u) => u.id === pet.id);
      let newPet: Pet = new Pet(pet);
      if (index != -1) {
        data.pets.splice(index, 1, newPet);
        this.write(data);
        return { data: data.pets, msg: 'Mascota modificada correctamente' };
      }
      throw new Error(`Mascota no encontrada`);
    } catch (err) {
      throw new NotFoundException(`Error: ${err}`);
    }
  }
  deletePet(id: number): any {
    try {
      const data = this.read();
      const index = data.pets.findIndex((u) => u.id === id);
      if (index != -1) {
        data.pets.splice(index, 1);
        this.write(data);
        return { data: data.pets, msg: 'Mascota eliminada correctamente}' };
      }
      throw new Error(`Mascota no encontrada`);
    } catch (err) {
      throw new NotFoundException(`Error: ${err}`);
    }
  }
}
