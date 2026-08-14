import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const EASINGS = {
  smooth: 'power2.out',
  smoothInOut: 'power2.inOut',
  smoothSlow: 'power3.out',
  smoothSlowInOut: 'power3.inOut',
  elastic: 'elastic.out(1, 0.5)',
};

export const DURATIONS = {
  heroLine: 0.8,
  heroStagger: 0.25,
  buttonStagger: 0.1,
  imageReveal: 1.2,
  badgeStagger: 0.3,
  section: 0.6,
  counter: 1.5,
  cardStagger: 0.12,
};

export const SCROLL_TRIGGER_DEFAULTS = {
  start: 'top 85%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse' as const,
};

export const DISTANCES = {
  fadeUp: 40,
  fadeUpSmall: 20,
};

// Distancia de scroll que dura el pin del Hero. La usan tanto el
// ScrollTrigger que pinea (Hero.tsx) como el que scrubea el timeline
// de las cards (CardsCarousel.tsx) — deben coincidir siempre.
export const HERO_PIN_DISTANCE = '+=190%';

export function createFadeUpScrollTrigger(
  targets: Element | Element[] | null,
  trigger: Element | null,
  stagger = 0
) {
  if (!targets || !trigger) return;
  return gsap.fromTo(
    targets,
    { opacity: 0, y: DISTANCES.fadeUp },
    {
      opacity: 1,
      y: 0,
      duration: DURATIONS.section,
      ease: EASINGS.smooth,
      stagger,
      scrollTrigger: {
        trigger,
        ...SCROLL_TRIGGER_DEFAULTS,
      },
    }
  );
}
