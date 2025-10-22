type UserDTO = { name: string; lastName: string; dni: number };
export class User {
  dni: number;
  name: string;
  lastName: string;
  constructor(data: UserDTO) {
    this.dni = data.dni;
    this.name = data.name;
    this.lastName = data.lastName;
  }
}
