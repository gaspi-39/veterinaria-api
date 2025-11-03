# Uso

## /pets

**GET /**
Obtiene el listado de mascotas (clientes)

**POST /**
{name: nombre, type: tipo animal, ownerDni: dni del dueño}

**PUT /**
{id: mascota a modificar, name: nombre, type: tipo animal, ownerDni: dni del dueño}

**DELETE /:id**
Ingresar la id de la mascota a eliminar

## /turnos

**GET /**
Obtiene el listado de turnos

**GET /sin**
Obtiene el listado de mascotas que deben agendar un turno

**POST /**
{petId: mascota, case: motivo, fecha: {dia: ,mes: ,anio: }}

**DELETE /:id**
Ingresar la id del turno a eliminar

## /users

**GET /**
Obtiene el listado de usuarios (dueños)

**POST /**
{dni: dni, name: nombre, lastName: apellido}

**PUT /**
{dni: dni, name: nombre, lastName: apellido}

**DELETE /:dni**
Ingresar dni del usuario a eliminar

## /history

**GET /**
Obtiene los historiales medicos de cada mascota

**GET /:id**
Obtiene el historial de una mascota en especifico

**POST /:id**
{vacunas: {nombre: , fecha: {dia: , mes: , anio: }, proxima: {dia: , mes: , anio: }},
tratamientos: {nombre: ,duracionDias: },
diagnosticos: {fecha: {dia: , mes: , anio: }. descripcion: ,}
}

**DELETE /:id/:campo/:idCampo**
Ingresar la id de mascota,el campo (vacunas, tratamientos, diagnosticos), luego la id del campo a eliminar
