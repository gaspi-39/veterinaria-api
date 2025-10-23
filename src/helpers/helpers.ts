import { User } from 'src/models/users.model';

export function verifyDNI(data, dni): boolean {
  const check: boolean = data.users.some((user) => user.dni === dni);
  return check;
}
export function verifyId(data, id): boolean {
  const check: boolean = data.pets.some((pet) => pet.id === id);
  return check;
}
