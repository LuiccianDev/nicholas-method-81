import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, SplitText);

export default function BlurText({ text }: { text: string }) {
  const container = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const split = SplitText.create(container.current, {
        type: 'chars',
        charsClass: 'letter',
      });

      gsap.set(split.chars, {
        opacity: 0,
        y: 0,
        filter: 'blur(16px)',
        willChange: 'transform, opacity, filter',
      });

      // recién aquí se revela el h1, ya con los chars en su estado inicial
      gsap.set(container.current, { opacity: 1 });

      gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        keyframes: [
          { color: '#86efac', duration: 0.1 },
          { color: '#22c55e', duration: 0.1 },
          { color: '#15803d', duration: 0.1 },
          { color: '#000000', duration: 0.1 },
        ],
        stagger: 0.03,
        ease: 'power3.out',
      });

      return () => split.revert();
    },
    { scope: container, dependencies: [text] }
  );

  return (
    <h1
      ref={container}
      className="px-2 font-boldonse text-6xl  font-extrabold tracking-tight text-black"
      style={{ opacity: 0 }}
    >
      {text}
    </h1>
  );
}
