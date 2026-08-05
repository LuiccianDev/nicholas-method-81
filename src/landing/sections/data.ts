// src/components/landing/sections/data.ts

export type Step = {
  number: number;
  headline: string;
  body: string;
};

export const STEPS_DATA: Step[] = [
  {
    number: 1,
    headline: 'Enter geometric & geomechanical parameters',
    body: 'Ingresa los parámetros geométricos y geomecánicos del yacimiento.',
  },
  {
    number: 2,
    headline: 'Nicholas 1981 ranks all 10 methods',
    body: 'El algoritmo Nicholas 1981 calcula y rankea los 10 métodos de minería subterránea.',
  },
  {
    number: 3,
    headline: 'Validate with AI Chat',
    body: 'Consulta el chat IA para validar y profundizar el resultado.',
  },
];

export type MethodCard = {
  name: string;
  descriptor: string; // ≤50 chars
};

export const METHODS_DATA: MethodCard[] = [
  { name: 'Open Pit', descriptor: 'Surface mining, shallow deposits' },
  { name: 'Block Caving', descriptor: 'Large, low-grade massive deposits' },
  { name: 'Sublevel Stoping', descriptor: 'Competent ore, moderate thickness' },
  { name: 'Sublevel Caving', descriptor: 'Weak ore, tabular to massive' },
  { name: 'Longwall', descriptor: 'Thin, flat coal or soft ore seams' },
  { name: 'Room & Pillar', descriptor: 'Flat, competent bedded deposits' },
  { name: 'Shrinkage Stoping', descriptor: 'Steep, narrow, competent veins' },
  { name: 'Cut & Fill', descriptor: 'High-value, irregular ore bodies' },
  { name: 'Top Slicing', descriptor: 'Weak ore under caving hanging wall' },
  { name: 'Square Set', descriptor: 'Weak ore and walls, high-grade' },
];

export type Stat = {
  value: number;
  label: string;
  suffix: string;
};

export const STATS_DATA: Stat[] = [
  { value: 1981, label: 'Year Published', suffix: '' },
  { value: 10, label: 'Mining Methods', suffix: '' },
  { value: 13, label: 'Parameters Evaluated', suffix: '' },
  { value: 9, label: 'Underground Methods', suffix: '' },
];

export const CTA_HEADLINE = 'SELECT YOUR METHOD. NOW.';
