import type { MiningMethod } from '../../types';

export const ELIMINATED = -49;

export const MINING_METHODS: MiningMethod[] = [
  'Open Pit',
  'Block Caving',
  'Sublevel Stoping',
  'Sublevel Caving',
  'Longwall',
  'Room & Pillar',
  'Shrinkage Stoping',
  'Cut & Fill',
  'Top Slicing',
  'Square Set',
];

export const T3_GEOMETRY = {
  'Open Pit': {
    shape: { M: 3, TP: 2, I: 3 },
    thickness: { N: 2, I: 3, T: 4, VT: 4 },
    plunge: { F: 3, I: 3, S: 4 },
    grade: { U: 3, G: 3, E: 3 },
  },
  'Block Caving': {
    shape: { M: 4, TP: 2, I: 0 },
    thickness: { N: ELIMINATED, I: 0, T: 2, VT: 4 },
    plunge: { F: 3, I: 2, S: 4 },
    grade: { U: 4, G: 2, E: 0 },
  },
  'Sublevel Stoping': {
    shape: { M: 2, TP: 2, I: 1 },
    thickness: { N: 1, I: 2, T: 4, VT: 3 },
    plunge: { F: 2, I: 1, S: 4 },
    grade: { U: 3, G: 3, E: 1 },
  },
  'Sublevel Caving': {
    shape: { M: 3, TP: 4, I: 1 },
    thickness: { N: ELIMINATED, I: 0, T: 4, VT: 4 },
    plunge: { F: 1, I: 1, S: 4 },
    grade: { U: 4, G: 2, E: 0 },
  },
  Longwall: {
    shape: { M: ELIMINATED, TP: 4, I: ELIMINATED },
    thickness: { N: 4, I: 0, T: ELIMINATED, VT: ELIMINATED },
    plunge: { F: 4, I: 0, S: ELIMINATED },
    grade: { U: 4, G: 2, E: 0 },
  },
  'Room & Pillar': {
    shape: { M: 0, TP: 4, I: 2 },
    thickness: { N: 4, I: 2, T: ELIMINATED, VT: ELIMINATED },
    plunge: { F: 4, I: 1, S: 0 },
    grade: { U: 3, G: 3, E: 3 },
  },
  'Shrinkage Stoping': {
    shape: { M: 2, TP: 2, I: 1 },
    thickness: { N: 1, I: 2, T: 4, VT: 3 },
    plunge: { F: 2, I: 1, S: 4 },
    grade: { U: 3, G: 2, E: 1 },
  },
  'Cut & Fill': {
    shape: { M: 0, TP: 4, I: 2 },
    thickness: { N: 4, I: 4, T: 0, VT: 0 },
    plunge: { F: 0, I: 3, S: 4 },
    grade: { U: 3, G: 3, E: 3 },
  },
  'Top Slicing': {
    shape: { M: 3, TP: 3, I: 0 },
    thickness: { N: ELIMINATED, I: 0, T: 3, VT: 4 },
    plunge: { F: 4, I: 1, S: 2 },
    grade: { U: 4, G: 2, E: 0 },
  },
  'Square Set': {
    shape: { M: 0, TP: 2, I: 4 },
    thickness: { N: 4, I: 4, T: 1, VT: 1 },
    plunge: { F: 2, I: 3, S: 3 },
    grade: { U: 3, G: 3, E: 3 },
  },
};

export const T4A_ORE = {
  'Open Pit': {
    sub: { W: 3, M: 4, S: 4 },
    spac: { VC: 2, C: 3, W: 4, VW: 4 },
    str: { W: 2, M: 3, S: 4 },
  },
  'Block Caving': {
    sub: { W: 4, M: 1, S: 1 },
    spac: { VC: 4, C: 4, W: 3, VW: 0 },
    str: { W: 4, M: 3, S: 0 },
  },
  'Sublevel Stoping': {
    sub: { W: ELIMINATED, M: 3, S: 4 },
    spac: { VC: 0, C: 0, W: 1, VW: 4 },
    str: { W: 0, M: 2, S: 4 },
  },
  'Sublevel Caving': {
    sub: { W: 0, M: 3, S: 3 },
    spac: { VC: 0, C: 2, W: 4, VW: 4 },
    str: { W: 0, M: 2, S: 2 },
  },
  Longwall: {
    sub: { W: 4, M: 1, S: 0 },
    spac: { VC: 4, C: 4, W: 0, VW: 0 },
    str: { W: 4, M: 3, S: 0 },
  },
  'Room & Pillar': {
    sub: { W: 0, M: 3, S: 4 },
    spac: { VC: 0, C: 1, W: 2, VW: 4 },
    str: { W: 0, M: 2, S: 4 },
  },
  'Shrinkage Stoping': {
    sub: { W: 1, M: 3, S: 4 },
    spac: { VC: 0, C: 1, W: 3, VW: 4 },
    str: { W: 0, M: 2, S: 4 },
  },
  'Cut & Fill': {
    sub: { W: 3, M: 2, S: 2 },
    spac: { VC: 3, C: 3, W: 2, VW: 2 },
    str: { W: 3, M: 3, S: 2 },
  },
  'Top Slicing': {
    sub: { W: 2, M: 3, S: 3 },
    spac: { VC: 1, C: 1, W: 2, VW: 4 },
    str: { W: 1, M: 2, S: 4 },
  },
  'Square Set': {
    sub: { W: 4, M: 1, S: 1 },
    spac: { VC: 4, C: 4, W: 2, VW: 1 },
    str: { W: 4, M: 3, S: 2 },
  },
};

export const T4B_HANGING_WALL = {
  'Open Pit': {
    sub: { W: 3, M: 4, S: 4 },
    spac: { VC: 2, C: 3, W: 4, VW: 4 },
    str: { W: 2, M: 3, S: 4 },
  },
  'Block Caving': {
    sub: { W: 4, M: 2, S: 1 },
    spac: { VC: 3, C: 4, W: 3, VW: 0 },
    str: { W: 4, M: 2, S: 0 },
  },
  'Sublevel Stoping': {
    sub: { W: ELIMINATED, M: 3, S: 4 },
    spac: { VC: ELIMINATED, C: 0, W: 1, VW: 4 },
    str: { W: 0, M: 2, S: 4 },
  },
  'Sublevel Caving': {
    sub: { W: 3, M: 2, S: 1 },
    spac: { VC: 3, C: 4, W: 3, VW: 1 },
    str: { W: 4, M: 2, S: 0 },
  },
  Longwall: {
    sub: { W: 4, M: 2, S: 0 },
    spac: { VC: 4, C: 4, W: 3, VW: 0 },
    str: { W: 4, M: 2, S: 0 },
  },
  'Room & Pillar': {
    sub: { W: 0, M: 3, S: 4 },
    spac: { VC: 0, C: 1, W: 2, VW: 4 },
    str: { W: 0, M: 2, S: 4 },
  },
  'Shrinkage Stoping': {
    sub: { W: 4, M: 2, S: 1 },
    spac: { VC: 4, C: 4, W: 3, VW: 0 },
    str: { W: 4, M: 2, S: 0 },
  },
  'Cut & Fill': {
    sub: { W: 3, M: 2, S: 2 },
    spac: { VC: 3, C: 3, W: 2, VW: 2 },
    str: { W: 4, M: 3, S: 2 },
  },
  'Top Slicing': {
    sub: { W: 4, M: 2, S: 1 },
    spac: { VC: 3, C: 3, W: 3, VW: 0 },
    str: { W: 4, M: 2, S: 0 },
  },
  'Square Set': {
    sub: { W: 3, M: 2, S: 2 },
    spac: { VC: 3, C: 3, W: 2, VW: 2 },
    str: { W: 4, M: 3, S: 2 },
  },
};

export const T4C_FOOTWALL = {
  'Open Pit': {
    sub: { W: 3, M: 4, S: 4 },
    spac: { VC: 2, C: 3, W: 4, VW: 4 },
    str: { W: 2, M: 3, S: 4 },
  },
  'Block Caving': {
    sub: { W: 2, M: 3, S: 3 },
    spac: { VC: 1, C: 3, W: 3, VW: 3 },
    str: { W: 1, M: 3, S: 3 },
  },
  'Sublevel Stoping': {
    sub: { W: 0, M: 2, S: 4 },
    spac: { VC: 0, C: 0, W: 2, VW: 4 },
    str: { W: 0, M: 1, S: 4 },
  },
  'Sublevel Caving': {
    sub: { W: 0, M: 2, S: 4 },
    spac: { VC: 0, C: 1, W: 3, VW: 4 },
    str: { W: 0, M: 2, S: 4 },
  },
  Longwall: {
    sub: { W: 2, M: 3, S: 3 },
    spac: { VC: 1, C: 2, W: 4, VW: 3 },
    str: { W: 1, M: 3, S: 3 },
  },
  'Room & Pillar': {
    sub: { W: 0, M: 2, S: 4 },
    spac: { VC: 0, C: 1, W: 3, VW: 3 },
    str: { W: 0, M: 3, S: 3 },
  },
  'Shrinkage Stoping': {
    sub: { W: 2, M: 3, S: 3 },
    spac: { VC: 2, C: 3, W: 3, VW: 2 },
    str: { W: 2, M: 2, S: 3 },
  },
  'Cut & Fill': {
    sub: { W: 4, M: 2, S: 2 },
    spac: { VC: 4, C: 4, W: 2, VW: 2 },
    str: { W: 4, M: 4, S: 2 },
  },
  'Top Slicing': {
    sub: { W: 2, M: 3, S: 3 },
    spac: { VC: 1, C: 3, W: 3, VW: 3 },
    str: { W: 1, M: 2, S: 3 },
  },
  'Square Set': {
    sub: { W: 4, M: 2, S: 2 },
    spac: { VC: 4, C: 4, W: 2, VW: 2 },
    str: { W: 4, M: 4, S: 2 },
  },
};
