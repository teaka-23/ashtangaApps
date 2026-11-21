import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { toSilhouette, snapToGround } from './mono.mjs';

const root = dirname(fileURLToPath(import.meta.url));

const MODULES = [
  ['poses-surya.mjs', 'surya'],
  ['poses-standing.mjs', 'standing'],
  ['poses-seated1.mjs', 'seated1'],
  ['poses-seated2.mjs', 'seated2'],
  ['poses-finishing.mjs', 'finishing'],
  ['poses-intermediate.mjs', 'intermediate'],
  ['poses-advanced.mjs', 'advanced'],
];

for (const [mod, dirName] of MODULES) {
  const { FILES } = await import(join(root, mod));
  const dir = join(root, dirName);
  await mkdir(dir, { recursive: true });
  for (const [name, fn] of FILES) {
    const file = join(dir, `${name}.svg`);
    // Анатомия рисуется в системе 200×200, затем переводится в монохромный
    // силуэт: общий холст, одни чернила, дальние конечности — дымкой.
    // Пол в силуэт не входит, поэтому прижимаем фигуру к линии пола.
    const svg = snapToGround(toSilhouette(fn()));
    await writeFile(file, svg);
    console.log(file);
  }
}

