// TextCard.tsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, SplitText);

type TextCardProps = {
  eyebrow: string;
  statement: string;
  status?: string;
  size: string;
  active?: boolean;
};

export default function TextCard({
  eyebrow,
  statement,
  status,
  size,
  active = false,
}: TextCardProps) {
  const statementRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!statementRef.current) return;
      if (!active) return;

      const split = SplitText.create(statementRef.current, {
        type: 'words',
        wordsClass: 'letter',
      });

      gsap.fromTo(
        split.words,
        { opacity: 0, filter: 'blur(8px)', y: 8 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.04,
          duration: 0.5,
          ease: 'power3.out',
        }
      );

      return () => split.revert();
    },
    { scope: statementRef, dependencies: [statement, active] }
  );

  return (
    <div
      className={`flex flex-col justify-between rounded-sm border border-white/25 bg-white/10 p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] ${size}`}
    >
      <p className="mb-3 pb-2 text-xl font-medium text-white/70">{eyebrow}</p>
      <p
        ref={statementRef}
        className="text-3xl leading-tight font-bold tracking-tight"
      >
        {statement}
      </p>
      {status ? (
        <p className="mt-3 text-sm font-medium tracking-wide text-white/50">
          {status}
        </p>
      ) : null}
    </div>
  );
}
