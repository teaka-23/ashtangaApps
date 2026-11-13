import { POSES } from './poses';

const files = import.meta.glob('../../illustrations/**/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function svg(rel: string): string {
  const hit = Object.entries(files).find(([path]) => path.endsWith(`/${rel}.svg`));
  if (!hit) throw new Error(`Нет иллюстрации ${rel}`);
  return hit[1];
}

const S = {
  samasthiti: svg('surya/01-samasthitih'),
  urdhva: svg('surya/02-urdhva-hastasana'),
  uttana: svg('surya/03-uttanasana'),
  ardha: svg('surya/04-ardha-uttanasana'),
  chaturanga: svg('surya/05-chaturanga'),
  urdhvaMukha: svg('surya/06-urdhva-mukha'),
  adho: svg('surya/07-adho-mukha'),
  utkata: svg('surya/08-utkatasana'),
  warriorRight: svg('surya/09-virabhadrasana-1'),
  warriorLeft: svg('surya/10-virabhadrasana-1-left'),
} as const;

/** Кадры новой модели. Ключ — `pose` асаны. Нет ключа — старый рендер. */
const CARTOONS: Record<string, readonly string[]> = {
  'surya-a': [
    S.samasthiti,
    S.urdhva,
    S.uttana,
    S.ardha,
    S.chaturanga,
    S.urdhvaMukha,
    S.adho,
    S.ardha,
    S.uttana,
    S.urdhva,
    S.samasthiti,
  ],
  'surya-b': [
    S.samasthiti,
    S.utkata,
    S.uttana,
    S.ardha,
    S.chaturanga,
    S.urdhvaMukha,
    S.adho,
    S.warriorRight,
    S.chaturanga,
    S.urdhvaMukha,
    S.adho,
    S.warriorLeft,
    S.chaturanga,
    S.urdhvaMukha,
    S.adho,
    S.ardha,
    S.uttana,
    S.utkata,
    S.samasthiti,
  ],
  padangusthasana: [svg('standing/11-padangusthasana')],
  padahastasana: [svg('standing/12-pada-hastasana')],
  'trikonasana-a': [svg('standing/13-utthita-trikonasana-a')],
  'trikonasana-b': [svg('standing/14-utthita-trikonasana-b')],
  'parivrtta-trikonasana': [svg('standing/14b-parivrtta-trikonasana')],
  'parsvakonasana-a': [svg('standing/15-utthita-parshvakonasana-a')],
  'parsvakonasana-b': [svg('standing/16-utthita-parshvakonasana-b')],
  'parivrtta-parsvakonasana': [svg('standing/16b-parivrtta-parshvakonasana')],
  'prasarita-a': [svg('standing/17-prasarita-padottanasana-a')],
  'prasarita-b': [svg('standing/18-prasarita-padottanasana-b')],
  'prasarita-c': [svg('standing/19-prasarita-padottanasana-c')],
  'prasarita-d': [svg('standing/20-prasarita-padottanasana-d')],
  parsvottanasana: [svg('standing/21-parshvottanasana')],
  'utthita-hasta': [svg('standing/22-utthita-hasta-padangusthasana-a')],
  'ardha-baddha-padmottanasana': [svg('standing/24-ardha-baddha-padmottanasana')],
  utkatasana: [svg('surya/08-utkatasana')],
  'virabhadrasana-a': [svg('surya/09-virabhadrasana-1')],
  'virabhadrasana-b': [svg('standing/25-virabhadrasana-2')],
  dandasana: [svg('seated1/25b-dandasana')],
  'paschimottanasana-a': [svg('seated1/26-paschimattanasana-a')],
  'paschimottanasana-b': [svg('seated1/27-paschimattanasana-b')],
  'paschimottanasana-c': [svg('seated1/28-paschimattanasana-c')],
  purvottanasana: [svg('seated1/30-purvattanasana')],
  'ardha-baddha-padma-paschimottanasana': [svg('seated1/31-ardha-baddha-padma-paschimattanasana')],
  'trianga-mukha': [svg('seated1/32-triang-mukhaikapada-paschimattanasana')],
  'janu-sirsasana-a': [svg('seated1/33-janu-sirshasana-a')],
  'janu-sirsasana-b': [svg('seated1/34-janu-sirshasana-b')],
  'janu-sirsasana-c': [svg('seated1/35-janu-sirshasana-c')],
  'marichyasana-a': [svg('seated1/36-marichyasana-a')],
  'marichyasana-b': [svg('seated1/37-marichyasana-b')],
  'marichyasana-c': [svg('seated1/38-marichyasana-c')],
  'marichyasana-d': [svg('seated1/39-marichyasana-d')],
  navasana: [svg('seated1/40-navasana-a')],
  bhujapidasana: [svg('seated2/42-bhujapidasana')],
  kurmasana: [svg('seated2/43-kurmasana')],
  'supta-kurmasana': [svg('seated2/44-supta-kurmasana')],
  'garbha-pindasana': [svg('seated2/45-garbha-pindasana')],
  kukkutasana: [svg('seated2/46-kukkutasana')],
  'baddha-konasana-a': [svg('seated2/47-baddha-konasana-a')],
  'baddha-konasana-b': [svg('seated2/48-baddha-konasana-b')],
  'upavishta-konasana': [svg('seated2/49-upavishta-konasana')],
  'supta-konasana': [svg('seated2/50-supta-konasana')],
  'supta-padangusthasana': [svg('seated2/51-supta-padangusthasana')],
  'ubhaya-padangusthasana': [svg('seated2/52-ubhaya-padangusthasana')],
  'urdhva-mukha-paschimottanasana': [svg('seated2/53-urdhva-mukha-paschimottanasana')],
  'setu-bandhasana': [svg('seated2/54-setu-bandhasana')],
  'urdhva-dhanurasana': [svg('finishing/55-urdhva-dhanurasana')],
  sarvangasana: [svg('finishing/56-salamba-sarvangasana')],
  halasana: [svg('finishing/57-halasana')],
  karnapidasana: [svg('finishing/58-karnapidasana')],
  'urdhva-padmasana': [svg('finishing/59-urdhva-padmasana')],
  pindasana: [svg('finishing/60-pindasana')],
  matsyasana: [svg('finishing/61-matsyasana')],
  'uttana-padasana': [svg('finishing/62-uttana-padasana')],
  sirsasana: [svg('finishing/63-sirsasana')],
  'baddha-padmasana': [svg('finishing/64-baddha-padmasana')],
  padmasana: [svg('finishing/65-padmasana')],
  utpluthih: [svg('finishing/66-utpluthih')],
  savasana: [svg('finishing/67-savasana')],
};

export function cartoonFrames(pose: string): readonly string[] | undefined {
  return CARTOONS[pose];
}

/** Сколько кадров показывать: новая модель, иначе координаты в poses.ts. */
export function poseFrameCount(pose: string): number {
  return cartoonFrames(pose)?.length ?? POSES[pose]?.figures.length ?? 1;
}
