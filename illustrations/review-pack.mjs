/**
 * Пакет для внешней модели с image input.
 *
 * Модель, которая рисует иллюстрации, картинки не читает (см. `.clinerules`),
 * поэтому глазную приёмку делает владелец. Если нужно отдать кадры другой
 * модели, этот скрипт собирает PNG-контакт-листы **вне репозитория**:
 * 9 листов по 12 кадров с номерами, постеры-эталоны и `PROMPT.md` с чек-листом.
 *
 * Запуск: `node illustrations/review-pack.mjs [--out <dir>] [--clean]`
 * По умолчанию пишет в `/tmp/ashtanga-review`; в репозиторий не пишет ничего.
 * `--clean` — сначала удалить каталог, чтобы не смешивать со старым прогоном.
 */

import { cp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const root = dirname(fileURLToPath(import.meta.url));
const repo = dirname(root);

const MODULES = [
  ['poses-surya.mjs', 'surya'],
  ['poses-standing.mjs', 'standing'],
  ['poses-seated1.mjs', 'seated1'],
  ['poses-seated2.mjs', 'seated2'],
  ['poses-finishing.mjs', 'finishing'],
  ['poses-intermediate.mjs', 'intermediate'],
];

/** Постеры из `docs/references` — эталон для сверки. */
const REFS = [
  'docs/references/ashtanga-primary-series-cheat-sheet.jpg',
  'docs/references/ashtanga-finishing-nadi-shodhana.png',
];

const PER_SHEET = 12;
const COLS = 4;

/**
 * Браузер для рендера. Кэш Playwright может содержать старую ревизию Chromium:
 * `chromium.launch()` ждёт конкретную сборку, поэтому перебираем кэш и системный
 * Chrome, а если ничего нет — подсказываем `npx playwright install chromium`.
 */
async function launchBrowser() {
  const tried = [];
  try {
    return await chromium.launch();
  } catch (err) {
    tried.push(err.message.split('\n')[0]);
  }
  const candidates = [];
  if (process.env.REVIEW_CHROMIUM) candidates.push(process.env.REVIEW_CHROMIUM);
  const cache = join(homedir(), 'Library/Caches/ms-playwright');
  try {
    for (const dir of readdirSync(cache).filter((d) => d.startsWith('chromium-'))) {
      candidates.push(join(cache, dir, 'chrome-mac/Chromium.app/Contents/MacOS/Chromium'));
      candidates.push(join(cache, dir, 'chrome-linux/chrome'));
    }
  } catch {
    /* кэша нет — идём к системному браузеру */
  }
  candidates.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
  for (const executablePath of candidates) {
    try {
      return await chromium.launch({ executablePath });
    } catch {
      tried.push(executablePath);
    }
  }
  throw new Error(
    `Не нашёл браузер для рендера. Запусти \`npx playwright install chromium\`.\nПробовал:\n${tried.join('\n')}`,
  );
}

const argv = process.argv.slice(2);
const outIdx = argv.indexOf('--out');
const outDir = outIdx >= 0 && argv[outIdx + 1] ? argv[outIdx + 1] : '/tmp/ashtanga-review';

if (argv.includes('--clean')) await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

// Порядок кадров — как в серии: FILES, а не алфавит по каталогу.
const frames = [];
for (const [mod, dirName] of MODULES) {
  const { FILES } = await import(pathToFileURL(join(root, mod)).href);
  for (const [name] of FILES) frames.push({ id: `${dirName}/${name}`, file: join(root, dirName, `${name}.svg`) });
}

const cells = [];
const missing = [];
for (const [i, f] of frames.entries()) {
  try {
    await stat(f.file);
  } catch {
    missing.push(f.id);
    continue;
  }
  cells.push({ n: i + 1, ...f, svg: await readFile(f.file, 'utf8') });
}

const styles = `
  body { margin: 0; padding: 24px; background: #faf8f5; color: #5a4632;
         font-family: Georgia, 'Times New Roman', serif; }
  .sheet { margin: 0 0 28px; padding: 16px 18px 20px; background: #fff;
           border: 1px solid #ece4d8; border-radius: 14px; }
  h2 { font-size: 14px; letter-spacing: 0.16em; margin: 0 0 14px; color: #8a6f4d; }
  .grid { display: grid; grid-template-columns: repeat(${COLS}, 200px); gap: 14px 18px; }
  .cell { margin: 0; text-align: center; }
  .pic { height: 200px; background: #faf8f5; border: 1px solid #f0e8db; border-radius: 10px; }
  .pic svg { width: 200px; height: 200px; display: block; }
  figcaption { margin-top: 5px; font-size: 10px; line-height: 1.25; color: #8a6f4d;
               word-break: break-word; }
  figcaption b { color: #5a4632; }
`;

const sheets = [];
for (let s = 0; s * PER_SHEET < cells.length; s++) {
  const part = cells.slice(s * PER_SHEET, (s + 1) * PER_SHEET);
  const cellsHtml = part
    .map(
      (c) =>
        `<figure class="cell"><div class="pic">${c.svg}</div>` +
        `<figcaption><b>${c.n}</b> ${c.id}</figcaption></figure>`,
    )
    .join('\n');
  sheets.push(
    `<section class="sheet"><h2>Лист ${s + 1} — кадры ${part[0].n}–${part[part.length - 1].n}</h2>` +
      `<div class="grid">${cellsHtml}</div></section>`,
  );
}

await writeFile(
  join(outDir, 'index.html'),
  `<!DOCTYPE html>\n<html lang="ru"><head><meta charset="utf-8"><title>Ревью иллюстраций</title>` +
    `<style>${styles}</style></head><body>${sheets.join('\n')}</body></html>`,
);

const browser = await launchBrowser();
const page = await browser.newPage({
  viewport: { width: COLS * 200 + 140, height: 900 },
  deviceScaleFactor: 2,
});
await page.goto(pathToFileURL(join(outDir, 'index.html')).href);
const shot = [];
const total = await page.locator('.sheet').count();
for (let i = 0; i < total; i++) {
  const name = `sheet-${String(i + 1).padStart(2, '0')}.png`;
  await page.locator('.sheet').nth(i).screenshot({ path: join(outDir, name) });
  shot.push(name);
}
await browser.close();

await mkdir(join(outDir, 'refs'), { recursive: true });
for (const ref of REFS) await cp(join(repo, ref), join(outDir, 'refs', basename(ref)));

const prompt = `# Ревью иллюстраций асан

## Вход
- \`sheet-01.png\` … \`sheet-${String(shot.length).padStart(2, '0')}.png\` — контакт-листы по ${PER_SHEET} кадров.
  Нумерация сквозная (1–${cells.length}); под номером — id файла \`секция/имя\`.
- \`refs/\` — постеры-эталоны (первая серия, финишинг). Сверяй позу с постером,
  но помни: здесь монохромные силуэты, пол и тени не рисуются.

## Что проверять в кадре
1. Асана читается с одного взгляда: направление наклона, где таз, где голова.
2. Конечности: две руки и две ноги, обе растут из тела, ничего не оторвано.
3. Грифы: кисть на стопе/голени там, где поза этого требует; замок рук читается.
4. Опора: фигура стоит на полу, а не висит; у балансов — на кистях/предплечьях.
5. Дальняя конечность светлее (дымка). Если дымка съела читаемость — замечание.
6. Пропорции: рука не «лапша», бёдра не сплющены, голова не больше торса.
7. Симметричные позы: половины не разъезжаются.

## Формат ответа
Только проблемные кадры, одна строка на кадр:
\`42 FIX — бедро слилось с торсом, нога не читается\`
Итог: \`OK: N, FIX: M\` и список FIX. Сомнение — \`?\` и что именно не разобрать.
Не выдумывай дефекты: при 200 px пальцы и подол не читаются в принципе.

## Границы
Финальное ✅ ставит владелец в \`docs/illustration-review.md\`: вердикт модели —
предфильтр, а не приёмка.
`;

await writeFile(join(outDir, 'PROMPT.md'), prompt);

console.log(`Кадров: ${cells.length}${missing.length ? ` (нет SVG: ${missing.length})` : ''}`);
if (missing.length) console.log('  пропущены:', missing.join(', '));
console.log(`Контакт-листы: ${shot.length} × ${PER_SHEET} (${shot[0]}…${shot[shot.length - 1]})`);
console.log(`Пакет: ${outDir}`);
console.log('В репозиторий ничего не записано — убедись по `git status`.');
if (missing.length) {
  console.log('Сначала `npm run illustrations`, потом повтори запуск.');
  process.exit(1);
}
