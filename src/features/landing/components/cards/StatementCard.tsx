import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, SplitText);

type StatementCardProps = {
  eyebrow: string;
  statement: string;
  status?: string;
  size: string;
  active?: boolean;
  delay?: number;
};

export default function StatementCard({
  eyebrow,
  statement,
  status,
  size,
  active = false,
  delay = 0,
}: StatementCardProps) {
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
      className={`flex flex-col justify-between gap-3 rounded-sm border border-black/20 bg-black/10 p-5 text-white backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] md:p-6 ${size}`}
    >
      <p className="text-center font-mono text-xl font-medium">{eyebrow}</p>
      <p
        ref={statementRef}
        className="text-center font-boldonse text-3xl leading-tight font-bold"
      >
        {statement}
      </p>
      {status ? (
        <p className="text-center text-xl font-medium">{status}</p>
      ) : null}
    </div>
  );
}
