import { Injectable, NotFoundException } from '@nestjs/common';
import { read, write } from '../db/filemanager';
import { User } from 'src/models/users.model';
import { userValidator } from 'src/validators/users.validators';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {
  read(): any {
    const ruta: string = path.join('..', 'db', 'data.json');
    try {
      const data: any = JSON.parse(fs.readFileSync(ruta, 'utf-8'));
      return data;
    } catch (err) {
      throw new NotFoundException(`Error: ${err}`);
    }
  }
  write(data): any {
    const ruta: string = path.join('..', 'db', 'data.json');
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
    if (!userValidator(user)) {
      throw new NotFoundException('Usuario no válido');
    }
    try {
      const data = this.read();
      const newUser: User = new User(user);
      data.users.push(newUser);
      this.write(data);
      return data.users.find((u) => u.dni == user.dni);
    } catch (err) {
      throw new NotFoundException(`Error: ${err}`);
    }
  }
  putUser(user: User): any {
    if (!userValidator(user)) {
      throw new NotFoundException('Usuario no válido');
    }
    try {
      const data = this.read();
      const index = data.users.findIndex((u) => u.dni === user.dni);
      let newUser: User = new User(user);
      data.users.splice(index, 1, newUser);
      this.write(data);
    } catch (err) {
      throw new NotFoundException(`Error: ${err}`);
    }
  }
  deleteUser(dni: number): any {
    try {
      const data = this.read();
      const index = data.users.findIndex((u) => u.dni === dni);
      data.users.splice(index, 1);
      this.write(data);
    } catch (err) {
      throw new NotFoundException(`Error: ${err}`);
    }
  }
}
