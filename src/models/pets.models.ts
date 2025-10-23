import { IsString, IsEmail, Length, IsNumber, IsEmpty } from 'class-validator';

type petsDTO = { id: number; name: string; type: string; ownerDni: number };
export class Pet {
  id: number;
  @IsString()
  @Length(2, 10)
  name: string;
  @IsString()
  @Length(2, 10)
  type: string;
  @IsNumber()
  ownerDni: number;

  constructor(data: petsDTO) {
    this.id = data.id;
    this.name = data.name;
    this.ownerDni = data.ownerDni;
    this.type = data.type;
  }
}
