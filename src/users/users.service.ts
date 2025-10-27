import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/models/users.model';
import * as fs from 'fs';
import { verifyDNI } from 'src/helpers/helpers';

const ruta: string =
  'C:/Users/lazar/OneDrive/Documentos/TECDA/1er año/EDI/veterinaria-api/src/db/data.json';

@Injectable()
export class UsersService {
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
  getUsers(): any {
    const data = this.read();
    return data.users;
  }
  createUser(user: User): any {
    try {
      const data = this.read();
      const newUser: User = new User(user);

      if (verifyDNI(data, newUser.dni)) {
        throw new Error(`El dni ya está registrado`);
      }

      data.users.push(newUser);
      this.write(data);
      return { data: data.users, msg: 'Usuario creado correctamente' };
    } catch (err) {
      throw new NotFoundException(`Error: ${err}`);
    }
  }
  putUser(user: User): any {
    try {
      const data = this.read();
      const index = data.users.findIndex((u) => u.dni === user.dni);
      let newUser: User = new User(user);
      if (index != -1) {
        data.users.splice(index, 1, newUser);
        this.write(data);
        return { data: data.users, msg: 'Usuario modificado correctamente' };
      }
      throw new Error(`Usuario no encontrado`);
    } catch (err) {
      throw new NotFoundException(`Error: ${err}`);
    }
  }
  deleteUser(dni: number): any {
    try {
      const data = this.read();
      const index = data.users.findIndex((u) => u.dni === dni);
      if (index != -1) {
        data.users.splice(index, 1);
        this.write(data);
        return { data: data.users, msg: 'Usuario eliminado correctamente}' };
      }
      throw new Error(`Usuario no encontrado`);
    } catch (err) {
      throw new NotFoundException(`Error: ${err}`);
    }
  }
}
