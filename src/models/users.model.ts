import { IsString, IsEmail, Length, IsNumber } from 'class-validator';

type UserDTO = { dni: number; name: string; lastName: string };
export class User {
  @IsNumber()
  dni: number;
  @IsString()
  @Length(2, 10)
  name: string;
  @IsString()
  @Length(2, 10)
  lastName: string;
  constructor(data: UserDTO) {
    this.dni = data.dni;
    this.name = data.name;
    this.lastName = data.lastName;
  }
}
