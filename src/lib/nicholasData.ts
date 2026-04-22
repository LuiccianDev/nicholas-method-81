import type {
  Thickness,
  Plunge,
  SubStr,
  FracSpac,
  MethodInput,
  MiningMethod,
  ScoredMethod,
  RawMethodInput,
} from '../types';

export function getThicknessCat(val: number | ''): Thickness {
  if (val === '') return 'I';
  if (val < 10) return 'N';
  if (val <= 30) return 'I';
  if (val <= 100) return 'T';
  return 'VT';
}

export function getThicknessLabel(val: number | '') {
  return { N: 'Narrow', I: 'Intermediate', T: 'Thick', VT: 'Very Thick' }[
    getThicknessCat(val)
  ];
}

export function getPlungeCat(val: number | ''): Plunge {
  if (val === '') return 'I';
  if (val < 20) return 'F';
  if (val <= 55) return 'I';
  return 'S';
}

export function getPlungeLabel(val: number | '') {
  return { F: 'Flat', I: 'Intermediate', S: 'Steep' }[getPlungeCat(val)];
}

export function getSubStrCat(val: number | ''): SubStr {
  if (val === '') return 'M';
  if (val < 8) return 'W';
  if (val <= 15) return 'M';
  return 'S';
}

export function getSubStrLabel(val: number | '') {
  return { W: 'Weak', M: 'Moderate', S: 'Strong' }[getSubStrCat(val)];
}

export function getFracSpacCat(val: number | ''): FracSpac {
  if (val === '') return 'C';
  if (val < 3) return 'VW';
  if (val <= 10) return 'W';
  if (val <= 16) return 'C';
  return 'VC';
}

export function getFracSpacLabel(val: number | '') {
  return { VC: 'Very Close', C: 'Close', W: 'Wide', VW: 'Very Wide' }[
    getFracSpacCat(val)
  ];
}

export function deriveMethodInput(raw: RawMethodInput): MethodInput {
  return {
    shape: raw.shape,
    thickness: getThicknessCat(raw.thickness),
    plunge: getPlungeCat(raw.plunge),
    grade: raw.grade,
    oreSubStr: getSubStrCat(raw.oreSubStr),
    oreFracSpac: getFracSpacCat(raw.oreFracSpac),
    oreFracStr: raw.oreFracStr,
    hwSubStr: getSubStrCat(raw.hwSubStr),
    hwFracSpac: getFracSpacCat(raw.hwFracSpac),
    hwFracStr: raw.hwFracStr,
    fwSubStr: getSubStrCat(raw.fwSubStr),
    fwFracSpac: getFracSpacCat(raw.fwFracSpac),
    fwFracStr: raw.fwFracStr,
  };
}

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

const T3_GEOMETRY = {
  'Open Pit': {
    shape: { M: 3, TP: 2, I: 3 },
    thickness: { N: 2, I: 3, T: 4, VT: 4 },
    plunge: { F: 3, I: 3, S: 4 },
    grade: { U: 3, G: 3, E: 3 },
  },
  'Block Caving': {
    shape: { M: 4, TP: 2, I: 0 },
    thickness: { N: -49, I: 0, T: 2, VT: 4 },
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
    thickness: { N: -49, I: 0, T: 4, VT: 4 },
    plunge: { F: 1, I: 1, S: 4 },
    grade: { U: 4, G: 2, E: 0 },
  },
  Longwall: {
    shape: { M: -49, TP: 4, I: -49 },
    thickness: { N: 4, I: 0, T: -49, VT: -49 },
    plunge: { F: 4, I: 0, S: -49 },
    grade: { U: 4, G: 2, E: 0 },
  },
  'Room & Pillar': {
    shape: { M: 0, TP: 4, I: 2 },
    thickness: { N: 4, I: 2, T: -49, VT: -49 },
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
    thickness: { N: -49, I: 0, T: 3, VT: 4 },
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

const T4A_ORE = {
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
    sub: { W: -49, M: 3, S: 4 },
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

const T4B_HANGING_WALL = {
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
    sub: { W: -49, M: 3, S: 4 },
    spac: { VC: -49, C: 0, W: 1, VW: 4 },
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

const T4C_FOOTWALL = {
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

export function calculateScores(input: MethodInput): ScoredMethod[] {
  return MINING_METHODS.map((method) => {
    // Geo/Grade
    const geo = T3_GEOMETRY[method];
    const shp = geo.shape[input.shape];
    const thk = geo.thickness[input.thickness];
    const pln = geo.plunge[input.plunge];
    const grd = geo.grade[input.grade];
    const geometryScore = shp + thk + pln + grd;

    // Ore Zone
    const ore = T4A_ORE[method];
    const oSub = ore.sub[input.oreSubStr];
    const oSpac = ore.spac[input.oreFracSpac];
    const oStr = ore.str[input.oreFracStr];
    const oreScore = oSub + oSpac + oStr;

    // Hanging Wall
    const hwData = T4B_HANGING_WALL[method];
    const hwSub = hwData.sub[input.hwSubStr];
    const hwSpac = hwData.spac[input.hwFracSpac];
    const hwStr = hwData.str[input.hwFracStr];
    const hwScore = hwSub + hwSpac + hwStr;

    // Footwall
    const fwData = T4C_FOOTWALL[method];
    const fwSub = fwData.sub[input.fwSubStr];
    const fwSpac = fwData.spac[input.fwFracSpac];
    const fwStr = fwData.str[input.fwFracStr];
    const fwScore = fwSub + fwSpac + fwStr;

    const rockTotal = oreScore + hwScore + fwScore;
    const total = geometryScore + rockTotal;

    return {
      method,
      geometryScore,
      oreScore,
      hwScore,
      fwScore,
      rockTotal,
      total,
    };
  }).sort((a, b) => b.total - a.total); // Sort highest first
}
