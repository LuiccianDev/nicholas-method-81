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
  const hasPlayedRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!statementRef.current) return;
      if (!active || prefersReducedMotion || hasPlayedRef.current) return;

      hasPlayedRef.current = true;

      const split = SplitText.create(statementRef.current, {
        type: 'words',
        wordsClass: 'word',
      });

      gsap.fromTo(
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
    },
    {
      scope: statementRef,
      dependencies: [statement, active, delay, prefersReducedMotion],
    }
  );

  return (
    <div
      className={`flex card-shell flex-col justify-between gap-3 p-5 md:p-6 ${size}`}
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
