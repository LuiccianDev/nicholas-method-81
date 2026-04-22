export type Shape = 'M' | 'TP' | 'I';
export type Thickness = 'N' | 'I' | 'T' | 'VT';
export type Plunge = 'F' | 'I' | 'S';
export type Grade = 'U' | 'G' | 'E';

export type SubStr = 'W' | 'M' | 'S';
export type FracSpac = 'VC' | 'C' | 'W' | 'VW';
export type FracStr = 'W' | 'M' | 'S';

export interface RawMethodInput {
  shape: Shape;
  thickness: number | '';
  plunge: number | '';
  depth: number | '';
  grade: Grade;
  oreSubStr: number | '';
  oreFracSpac: number | '';
  oreFracStr: FracStr;
  hwSubStr: number | '';
  hwFracSpac: number | '';
  hwFracStr: FracStr;
  fwSubStr: number | '';
  fwFracSpac: number | '';
  fwFracStr: FracStr;
}

export interface MethodInput {
  shape: Shape;
  thickness: Thickness;
  plunge: Plunge;
  grade: Grade;
  oreSubStr: SubStr;
  oreFracSpac: FracSpac;
  oreFracStr: FracStr;
  hwSubStr: SubStr;
  hwFracSpac: FracSpac;
  hwFracStr: FracStr;
  fwSubStr: SubStr;
  fwFracSpac: FracSpac;
  fwFracStr: FracStr;
}

export type MiningMethod =
  | 'Open Pit'
  | 'Block Caving'
  | 'Sublevel Stoping'
  | 'Sublevel Caving'
  | 'Longwall'
  | 'Room & Pillar'
  | 'Shrinkage Stoping'
  | 'Cut & Fill'
  | 'Top Slicing'
  | 'Square Set';

export interface ScoredMethod {
  method: MiningMethod;
  geometryScore: number;
  oreScore: number;
  hwScore: number;
  fwScore: number;
  rockTotal: number;
  total: number;
  isEliminated?: boolean;
}

export interface ChartDataRow {
  name: MiningMethod;
  Geometry: number;
  RockMechanics: number;
  Total: number;
  isEliminated: boolean;
}
