// Content data for the landing sections.

export type Step = {
  number: number;
  headline: string;
  body: string;
};

export const STEPS_DATA: Step[] = [
  {
    number: 1,
    headline: 'Enter geometric & geomechanical parameters',
    body: 'Describe the deposit — geometry, grade distribution, and ore, hanging-wall, and footwall rock substance strength.',
  },
  {
    number: 2,
    headline: 'Nicholas 1981 ranks all 10 methods',
    body: 'The algorithm scores each method from your inputs and returns a ranked shortlist in seconds.',
  },
  {
    number: 3,
    headline: 'Validate with AI Chat',
    body: 'Ask the AI assistant to explain the ranking, explore trade-offs, and refine your decision.',
  },
];

export type MethodCard = {
  name: string;
  descriptor: string; // ≤50 chars
  code: string; // short slug for the placeholder / alt
};

export const METHODS_DATA: MethodCard[] = [
  {
    name: 'Open Pit',
    descriptor: 'Surface mining, shallow deposits',
    code: 'OPEN PIT',
  },
  {
    name: 'Block Caving',
    descriptor: 'Large, low-grade massive deposits',
    code: 'BLOCK CAVING',
  },
  {
    name: 'Sublevel Stoping',
    descriptor: 'Competent ore, moderate thickness',
    code: 'SUBLEVEL STOPING',
  },
  {
    name: 'Sublevel Caving',
    descriptor: 'Weak ore, tabular to massive',
    code: 'SUBLEVEL CAVING',
  },
  {
    name: 'Longwall',
    descriptor: 'Thin, flat coal or soft ore seams',
    code: 'LONGWALL',
  },
  {
    name: 'Room & Pillar',
    descriptor: 'Flat, competent bedded deposits',
    code: 'ROOM & PILLAR',
  },
  {
    name: 'Shrinkage Stoping',
    descriptor: 'Steep, narrow, competent veins',
    code: 'SHRINKAGE STOPING',
  },
  {
    name: 'Cut & Fill',
    descriptor: 'High-value, irregular ore bodies',
    code: 'CUT & FILL',
  },
  {
    name: 'Top Slicing',
    descriptor: 'Weak ore under caving hanging wall',
    code: 'TOP SLICING',
  },
  {
    name: 'Square Set',
    descriptor: 'Weak ore and walls, high-grade',
    code: 'SQUARE SET',
  },
];

export const HERO_TAGLINE =
  "Rank all ten mining methods from the deposit's geometry, grade, and geomechanics in seconds.";

export const HERO_HEADLINE = 'The right method, ranked in seconds';

export const HERO_CAPTIONS: {
  left: string;
  right: string;
  bottomPrimary: string;
  bottomSecondary: string;
}[] = [
  {
    left: 'Built for the ground truth, not the estimate',
    right: 'Rank all ten mining methods ',
    bottomPrimary: 'Engineering decisions',
    bottomSecondary: "your site can't take back",
  },
  {
    left: 'Every method scored the same way',
    right: 'Evaluates deposit characteristics objectively.',
    bottomPrimary: 'Objective scoring',
    bottomSecondary: 'backed by Nicholas 1981',
  },
  {
    left: 'From ten candidates to one',
    right: 'Refine by cost and technical ',
    bottomPrimary: 'Optimal selection',
    bottomSecondary: 'refined with intelligent AI',
  },
];

export type OverviewStat = {
  value: number;
  label: string;
};

export const OVERVIEW_STATS: OverviewStat[] = [
  { value: 10, label: 'Methods' },
  { value: 13, label: 'Parameters' },
  { value: 1981, label: 'Origin' },
];
