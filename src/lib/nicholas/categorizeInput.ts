import type {
  Thickness,
  Plunge,
  SubStr,
  FracSpac,
  MethodInput,
  RawMethodInput,
} from '../../types';

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
