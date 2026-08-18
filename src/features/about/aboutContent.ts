export const ABOUT_HERO = {
  eyebrow: 'About this project',
  sectionCode: 'NM-00',
  headlineTop: 'Turning deposits',
  headlineAccent: 'into decisions',
  tagline:
    "Nicholas Method 81 is a web tool that ranks the ten mining methods from your deposit's geometry, grade, and geomechanics — objectively, in seconds.",
  ctaLabel: 'Try the calculator',
  ctaHref: '/calculator',
};

export const WHY = {
  sectionCode: 'NM-01',
  label: 'Why this project',
  headlineTop: 'Mining decisions',
  headlineAccent: "shouldn't be",
  headlineBottom: 'guessed',
  paragraphs: [
    'Every deposit is different — yet method selection has often leaned on experience and intuition instead of numbers.',
    'Nicholas Method 81 turns that around: it scores each mining method against the actual parameters of the deposit and returns a ranked, reproducible recommendation.',
    'I built this site to make the Nicholas 1981 methodology accessible — a calculator, a ranking engine, and an AI assistant to validate the final call.',
  ],
};

export const METHODOLOGY = {
  sectionCode: 'NM-02',
  label: 'The methodology',
  headlineTop: 'Nicholas',
  headlineAccent: '1981',
  headlineBottom: 'explained',
  intro:
    'Published in 1981 by David Nicholas, this numerical method evaluates ten mining methods using geometric and geomechanical inputs from the deposit — the same inputs you enter in the calculator.',
  points: [
    {
      tag: 'Geometry & grade',
      title: 'Deposit shape and quality',
      body: 'Shape, thickness, plunge and grade distribution define how well each method would fit the orebody.',
    },
    {
      tag: 'Geomechanics',
      title: 'Rock substance strength',
      body: 'Strength of the ore, hanging wall and footwall constrains which methods remain technically viable.',
    },
    {
      tag: 'Scoring matrix',
      title: 'One matrix, no hidden criteria',
      body: 'Every method is scored across the same matrix and ranked — fully reproducible, fully transparent.',
    },
    {
      tag: 'Underground selection',
      title: 'Open pit is discarded',
      body: 'When the goal is an underground method, open pit is removed from the shortlist by design.',
    },
  ],
  stats: [
    { value: 1981, label: 'Year published' },
    { value: 10, label: 'Mining methods' },
    { value: 13, label: 'Parameters' },
    { value: 9, label: 'Underground methods' },
  ],
};

export const FEATURES = {
  sectionCode: 'NM-03',
  label: 'What the site does',
  headlineTop: 'Everything you need',
  headlineAccent: 'to choose',
  headlineBottom: 'objectively',
  intro:
    'From raw deposit data to a ranked, AI-validated mining method selection — all in one place.',
  items: [
    {
      number: 1,
      title: 'Deposit calculator',
      body: 'Enter geometry, grade and geomechanics for the ore, hanging wall and footwall.',
    },
    {
      number: 2,
      title: 'Ranked shortlist',
      body: 'All ten methods are scored and ordered in seconds, with a clear winner on top.',
    },
    {
      number: 3,
      title: 'Scoring matrix',
      body: 'Inspect exactly how every method was scored across the Nicholas matrix.',
    },
    {
      number: 4,
      title: 'AI validation',
      body: 'Ask the assistant to explain the ranking, explore trade-offs and refine the decision.',
    },
  ],
};

export const TECH_STACK = {
  sectionCode: 'NM-04',
  label: 'Built with',
  headlineTop: 'A modern',
  headlineAccent: 'stack',
  headlineBottom: 'end to end',
  groups: [
    { name: 'Framework', items: ['Astro 7', 'React 19', 'Vercel'] },
    { name: 'Core', items: ['TypeScript', 'Tailwind 4', 'GSAP'] },
    { name: 'Data & AI', items: ['Recharts', 'Gemini', '@google/genai'] },
    { name: 'UX & tools', items: ['Motion', 'lucide-react', 'pnpm'] },
  ],
};

export const CREATOR = {
  sectionCode: 'NM-05',
  label: 'The creator',
  headlineTop: 'Built by',
  headlineAccent: 'Luiccian',
  headlineBottom: '— William Guevara',
  bio: 'Developer focused on engineering tools and technical interfaces. I believe mining decisions should be driven by data, not intuition, even when the problem lives underground.',
  links: [
    { name: 'GitHub', url: 'https://github.com/LuiccianDev' },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/william-guevara-lazaro-79274b2a3',
    },
    { name: 'Instagram', url: 'https://www.instagram.com/luiccian_dev' },
  ],
};
