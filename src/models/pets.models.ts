import { IsString, IsEmail, Length, IsNumber, IsEmpty } from 'class-validator';
import * as fs from 'fs';

export class Pet {
  id?: number;
  // @IsString()
  // @Length(2, 10)
  name: string;
  // @IsString()
  // @Length(2, 10)
  type: string;
  // @IsNumber()
  ownerDni: number;

  constructor(name: string, ownerDni: number, type: string) {
    this.id = Date.now();
    this.name = name;
    this.ownerDni = ownerDni;
    this.type = type;
  }
}
