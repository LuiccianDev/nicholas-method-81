// TextCard.tsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, SplitText);

type TextCardProps = {
  eyebrow: string;
  statement: string;
  status?: string;
  size: string;
  active?: boolean;
  delay?: number;
};

export default function TextCard({
  eyebrow,
  statement,
  status,
  size,
  active = false,
  delay = 0,
}: TextCardProps) {
  const statementRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!statementRef.current) return;
      if (!active || prefersReducedMotion) return;

      const split = SplitText.create(statementRef.current, {
        type: 'words',
        wordsClass: 'letter',
      });

      const tween = gsap.fromTo(
        split.words,
        { opacity: 0, filter: 'blur(8px)', y: 8 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.025,
          duration: 0.35,
          delay,
          ease: 'power3.out',
        }
      );

      return () => {
        tween.kill();
        split.revert();
      };
    },
    {
      scope: statementRef,
      dependencies: [statement, active, delay, prefersReducedMotion],
    }
  );

  return (
    <div
      className={`flex flex-col justify-between rounded-xl border border-black/20 bg-black/10 p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] md:p-5 ${size}`}
    >
      <p className="mb-2 text-base font-medium text-white/70 md:text-lg">
        {eyebrow}
      </p>
      <p
        ref={statementRef}
        className="text-2xl leading-tight font-bold tracking-tight md:text-3xl"
      >
        {statement}
      </p>
      {status ? (
        <p className="mt-2 text-xs font-medium tracking-wide text-white/50 md:text-sm">
          {status}
        </p>
      ) : null}
    </div>
  );
}
