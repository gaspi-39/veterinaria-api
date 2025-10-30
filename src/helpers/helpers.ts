import { User } from 'src/models/users.model';
import * as fs from 'fs';
import { Fecha } from 'src/models/turno.models';
import { Diagnostico, Tratamiento, Vacuna } from 'src/models/history.models';

export function verifyDNI(data, dni: number): boolean {
  const check: boolean = data.users.some((user) => user.dni === dni);
  return check;
}
export function verifyId(data, id: number): boolean {
  const check: boolean = data.pets.some((pet) => pet.id === id);
  return check;
}
export function verifyTurnoId(data, id: number): boolean {
  const check: boolean = data.turnos.some((pet) => pet.id === id);
  return check;
}
export function getDate() {
  const fecha: any = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();
  return { dia: dia, mes: mes, anio: anio };
}
export function validateDate(fecha: Fecha): boolean {
  const fechaActual = getDate();
  let check: boolean = true;
  if (fecha.anio < fechaActual.anio) check = true;

  if (fecha.mes < fechaActual.mes) check = true;

  if (fecha.dia < fechaActual.dia) check = true;

  return check;
}
export function esVacuna(data: any): data is Vacuna {
  return (
    typeof data === 'object' &&
    typeof data.nombre === 'string' &&
    typeof data.fecha === 'object' &&
    typeof data.fecha.dia === 'number' &&
    typeof data.fecha.mes === 'number' &&
    typeof data.fecha.anio === 'number'
  );
}
export function esDiagnostico(data: any): data is Diagnostico {
  return (
    typeof data.descripcion === 'string' &&
    typeof data.fecha === 'object' &&
    typeof data.fecha.dia === 'number' &&
    typeof data.fecha.mes === 'number' &&
    typeof data.fecha.anio === 'number'
  );
}
export function esTratamiento(data: any): data is Tratamiento {
  return (
    typeof data.nombre === 'string' && typeof data.duracionDias === 'number'
  );
}
