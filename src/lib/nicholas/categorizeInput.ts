import type {
  Thickness,
  Plunge,
  SubStr,
  FracSpac,
  MethodInput,
  RawMethodInput,
} from '../../types';

interface CategoryDef<T extends string> {
  defaultValue: T;
  labels: Record<T, string>;
  thresholds: [limit: number, cat: T][];
}

function categorize<T extends string>(
  val: number | '',
  { defaultValue, labels, thresholds }: CategoryDef<T>
): T {
  if (val === '') return defaultValue;
  for (let i = 0; i < thresholds.length; i++) {
    const [limit, cat] = thresholds[i];
    if (i === 0 ? val < limit : val <= limit) return cat;
  }
  const cats = Object.keys(labels) as T[];
  return cats[cats.length - 1];
}

function labelFor<T extends string>(cat: T, labels: Record<T, string>): string {
  return labels[cat];
}

const THICKNESS: CategoryDef<Thickness> = {
  defaultValue: 'I',
  labels: { N: 'Narrow', I: 'Intermediate', T: 'Thick', VT: 'Very Thick' },
  thresholds: [
    [10, 'N'],
    [30, 'I'],
    [100, 'T'],
  ],
};

const PLUNGE: CategoryDef<Plunge> = {
  defaultValue: 'I',
  labels: { F: 'Flat', I: 'Intermediate', S: 'Steep' },
  thresholds: [
    [20, 'F'],
    [55, 'I'],
  ],
};

const SUB_STR: CategoryDef<SubStr> = {
  defaultValue: 'M',
  labels: { W: 'Weak', M: 'Moderate', S: 'Strong' },
  thresholds: [
    [8, 'W'],
    [15, 'M'],
  ],
};

const FRAC_SPAC: CategoryDef<FracSpac> = {
  defaultValue: 'C',
  labels: { VC: 'Very Close', C: 'Close', W: 'Wide', VW: 'Very Wide' },
  thresholds: [
    [3, 'VW'],
    [9, 'W'],
    [15, 'C'],
  ],
};

export function getThicknessCat(val: number | ''): Thickness {
  return categorize(val, THICKNESS);
}
export function getThicknessLabel(val: number | '') {
  return labelFor(getThicknessCat(val), THICKNESS.labels);
}

export function getPlungeCat(val: number | ''): Plunge {
  return categorize(val, PLUNGE);
}
export function getPlungeLabel(val: number | '') {
  return labelFor(getPlungeCat(val), PLUNGE.labels);
}

export function getSubStrCat(val: number | ''): SubStr {
  return categorize(val, SUB_STR);
}
export function getSubStrLabel(val: number | '') {
  return labelFor(getSubStrCat(val), SUB_STR.labels);
}

export function getFracSpacCat(val: number | ''): FracSpac {
  return categorize(val, FRAC_SPAC);
}
export function getFracSpacLabel(val: number | '') {
  return labelFor(getFracSpacCat(val), FRAC_SPAC.labels);
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
