import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

const MODULES = [
  ['poses-surya.mjs', 'surya'],
  ['poses-standing.mjs', 'standing'],
];

for (const [mod, dirName] of MODULES) {
  const { FILES } = await import(join(root, mod));
  const dir = join(root, dirName);
  await mkdir(dir, { recursive: true });
  for (const [name, fn] of FILES) {
    const file = join(dir, `${name}.svg`);
    await writeFile(file, fn());
    console.log(file);
  }
}
