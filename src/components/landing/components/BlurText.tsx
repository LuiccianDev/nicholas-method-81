import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function BlurText({ text }: { text: string }) {
  const container = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const letters = container.current?.querySelectorAll('.letter');

      if (!letters) return;

      gsap.to(letters, {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',

        keyframes: [
          {
            color: '#86efac', // verde claro
            duration: 0.1,
          },
          {
            color: '#22c55e', // verde
            duration: 0.1,
          },
          {
            color: '#15803d', // verde oscuro
            duration: 0.1,
          },
          {
            color: '#000000', // color final negro
            duration: 0.1,
          },
        ],

        stagger: 0.03,
        ease: 'power3.out',
      });
    },
    { scope: container }
  );

  return (
    <h1
      ref={container}
      style={{}}
      className="px-2 text-7xl leading-tight font-extrabold tracking-tighter text-black"
    >
      {text.split('').map((letter, index) => (
        <span
          key={index}
          className="letter"
          style={{
            display: 'inline-block',
            opacity: 0,
            transform: 'translateX(-10px)',
            filter: 'blur(40px)',
            color: '#666666',
            willChange: 'transform, opacity, filter',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </h1>
  );
}
