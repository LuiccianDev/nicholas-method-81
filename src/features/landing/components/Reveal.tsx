import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  scale?: number;
  delay?: number;
  duration?: number;
};

export default function Reveal({
  children,
  className,
  y = 40,
  scale,
  delay = 0,
  duration = 0.7,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y, ...(scale !== undefined && { scale }) },
          {
            opacity: 1,
            y: 0,
            ...(scale !== undefined && { scale: 1 }),
            duration,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              end: 'top 45%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(ref.current, {
          opacity: 1,
          y: 0,
          ...(scale !== undefined && { scale: 1 }),
        });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
