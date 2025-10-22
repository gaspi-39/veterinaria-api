import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

export function read() {
  const path = 'src/db/db.json';
  try {
    const data = fs.readFileSync(path, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('No se encontro datos', error);
    return;
  }
}

export function write(data) {
  const path = 'src/db/db.json';

  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('error al guardar:', error);
  }
}
