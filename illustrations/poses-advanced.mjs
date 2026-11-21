/**
 * Третья серия (Advanced A, Sthira Bhaga).
 * Фронтальный ¾: тело по диагонали, опорная рука вниз, свободная рука и нога
 * тянутся вверх. Дришти — на поднятую кисть (как в описании школы).
 */
import { draw, svgDocument } from './figure.mjs';

const { leg, arm, torso, shortsFrame, headFront, head, shadow, groundLine } = draw;

function doc(parts) {
  return svgDocument([groundLine(), ...parts].join('\n'));
}

export function vasisthasana() {
  return doc([
    shadow(100, 52),
    // Нижняя нога (дальняя, дымка): таз → колено → стопа плоско на настиле.
    leg([98, 132], [76, 124], [56, 160], { far: true, foot: 'flat', toe: -1, underShorts: true }),
    // Дальняя рука: плечо → локоть → кисть вверх (дымка).
    arm([132, 110], [144, 86], [150, 62], { far: true, hand: 'hold' }),
    // Торс по диагонали: таз внизу-слева, плечи вверху-справа.
    torso([
      [98, 138],
      [104, 126],
      [118, 112],
      [130, 108],
      [138, 118],
      [132, 128],
      [116, 140],
    ]),
    // Верхняя нога (ближняя): поднята вверх, стопа freeFlex.
    leg([104, 136], [80, 124], [60, 108], { foot: 'freeFlex', toe: -1, underShorts: true }),
    shortsFrame([102, 134], [0.72, -0.69], [0.69, 0.72], {
      rise: 10,
      half: 10.4,
      thighs: [
        [[104, 136], [80, 124]],
        [[98, 132], [76, 124]],
      ],
      legLen: 13,
      crotch: 5.6,
      inline: true,
    }),
    // Опорная рука: кисть на настиле под плечом.
    arm([132, 112], [138, 136], [140, 158], { hand: 'flat', fingers: -1 }),
    // Голова смотрит на поднятую кисть (дришти вверх).
    headFront([142, 96], [136, 112], [0.4, -0.92]),
  ]);
}

export const FILES = [['01-vasisthasana', vasisthasana]];
