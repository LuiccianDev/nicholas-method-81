export const EASINGS = {
  smooth: 'power2.out',
  smoothInOut: 'power2.inOut',
  smoothSlow: 'power3.out',
  smoothSlowInOut: 'power3.inOut',
  elastic: 'elastic.out(1, 0.5)',
}

export const DURATIONS = {
  heroLine: 0.8,
  heroStagger: 0.25,
  buttonStagger: 0.1,
  imageReveal: 1.2,
  badgeStagger: 0.3,
  section: 0.6,
  counter: 1.5,
  cardStagger: 0.12,
}

export const SCROLL_TRIGGER_DEFAULTS = {
  start: 'top 85%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse' as const,
}

export const DISTANCES = {
  fadeUp: 40,
  fadeUpSmall: 20,
}
