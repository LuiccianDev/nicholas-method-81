import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!footerRef.current) return;

      const q = gsap.utils.selector(footerRef);
      const footerLinks = q<HTMLAnchorElement>('.footer-link');
      const networkTitle = q<HTMLHeadingElement>('.network-title');

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: '(min-width: 1024px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions as {
            desktop: boolean;
            reduceMotion: boolean;
          };

          const mainDuration = reduceMotion ? 0 : 1;

          // Intro reveal for title and description.
          const introTimeline = gsap.timeline({
            defaults: {
              duration: mainDuration,
              ease: 'power2.out',
            },
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 80%',
              once: true,
            },
          });

          introTimeline
            .from(titleRef.current, {
              y: reduceMotion ? 0 : 30,
              autoAlpha: reduceMotion ? 1 : 0,
            })
            .from(
              descriptionRef.current,
              {
                y: reduceMotion ? 0 : 20,
                autoAlpha: reduceMotion ? 1 : 0,
              },
              reduceMotion ? '>' : '-=0.7'
            );

          gsap.from(detailsRef.current, {
            scrollTrigger: {
              trigger: detailsRef.current,
              start: 'top 90%',
              once: true,
            },
            scale: reduceMotion ? 1 : 0.88,
            rotationX: reduceMotion || !desktop ? 0 : 24,
            autoAlpha: reduceMotion ? 1 : 0,
            duration: reduceMotion ? 0 : 1,
            ease: 'back.out(1.7)',
            transformPerspective: 800,
          });

          if (footerLinks.length) {
            gsap.fromTo(
              footerLinks,
              {
                x: reduceMotion ? 0 : desktop ? 50 : 28,
                autoAlpha: reduceMotion ? 1 : 0,
              },
              {
                scrollTrigger: {
                  trigger: linksRef.current,
                  start: 'top 95%',
                  once: true,
                },
                x: 0,
                autoAlpha: 1,
                stagger: reduceMotion ? 0 : 0.1,
                duration: reduceMotion ? 0 : 0.8,
                ease: 'power2.out',
              }
            );
          }

          if (networkTitle.length) {
            gsap.fromTo(
              networkTitle,
              {
                y: reduceMotion ? 0 : 10,
                autoAlpha: reduceMotion ? 0.8 : 0,
              },
              {
                scrollTrigger: {
                  trigger: linksRef.current,
                  start: 'top 95%',
                  once: true,
                },
                autoAlpha: 0.8,
                y: 0,
                duration: reduceMotion ? 0 : 0.8,
                ease: 'power2.out',
              }
            );
          }

          if (textRef.current && textContainerRef.current) {
            if (reduceMotion) {
              gsap.set(textRef.current, {
                yPercent: 0,
                scale: 1,
                autoAlpha: 1,
              });
            } else {
              gsap.fromTo(
                textRef.current,
                {
                  yPercent: 100,
                  autoAlpha: 0,
                  scale: 0.92,
                },
                {
                  yPercent: 0,
                  autoAlpha: 1,
                  scale: 1,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: textContainerRef.current,
                    start: 'top 95%',
                    end: 'bottom bottom',
                    scrub: 1.2,
                  },
                }
              );
            }
          }
        }
      );

      return () => {
        mm.revert();
      };
    },
    { scope: footerRef }
  );

  const details = [
    { label: 'Core Algorithm', value: 'Nicholas Approach' },
    { label: 'Discipline', value: 'Rock Mechanics' },
    { label: 'Status', value: 'Engine Active', highlight: true },
  ];

  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/luiccian_dev' },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/william-guevara-lazaro-79274b2a3',
    },
    { name: 'GitHub', url: 'https://github.com/LuiccianDev' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative flex min-h-[85vh] flex-col justify-between overflow-hidden border-t border-border bg-surface pt-16 font-sans lg:min-h-screen lg:pt-24"
    >
      {/* Top Grid - Description & Links (wrapped with padding instead of footer) */}
      <div className="relative z-20 grid grid-cols-1 gap-12 px-6 sm:gap-16 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-20">
        {/* Left Column - Project Description */}
        <div className="flex flex-col justify-start lg:col-span-7 lg:pr-12">
          <h4
            ref={titleRef}
            className="mb-6 font-serif text-4xl leading-tight tracking-tight text-secondary italic md:text-5xl lg:mb-8 lg:text-6xl"
          >
            Mining Underground
          </h4>
          <p
            ref={descriptionRef}
            className="mb-10 max-w-2xl font-sans text-sm leading-relaxed text-foreground-muted sm:text-base lg:mb-12 lg:text-[16px]"
          >
            A numerical decision system for selecting the most suitable mining
            method. It evaluates the technical compatibility of various methods
            by comparing the characteristics of your deposit with the
            requirements of each.
          </p>

          <div
            ref={detailsRef}
            className="flex flex-col gap-8 border-t border-border pt-8 sm:flex-row sm:gap-12 lg:pt-10"
          >
            {details.map((detail, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <span className="font-mono text-[10px] tracking-[0.2em] text-secondary uppercase opacity-80 sm:text-[11px]">
                  {detail.label}
                </span>
                <span
                  className={`text-sm font-medium tracking-wide ${
                    detail.highlight ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Social Links */}
        <div className="mt-10 flex flex-col justify-start sm:mt-12 lg:col-span-5 lg:mt-0 lg:items-end">
          <div
            ref={linksRef}
            className="flex flex-col space-y-6 sm:space-y-8 lg:text-right"
          >
            <h4 className="network-title font-mono text-[10px] tracking-[0.2em] text-secondary uppercase opacity-80 sm:text-[11px]">
              Network
            </h4>

            <div className="flex flex-col space-y-4 sm:space-y-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="footer-link block w-full font-serif text-3xl text-foreground italic transition-all duration-300 hover:translate-x-2 hover:text-primary md:text-4xl lg:hover:-translate-x-2"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <AnimatePresence>
              {isVisible && (
                <motion.button
                  id="back-to-top"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={scrollToTop}
                  className="mb-12 w-fit cursor-pointer bg-secondary px-8 py-3 font-mono text-[11px] tracking-[0.2em] text-surface uppercase transition-colors duration-300 hover:bg-primary lg:ml-auto dark:bg-primary hover:dark:bg-secondary"
                >
                  Back to top
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Giant Reveal Text Container - Edge to Edge */}
      <div
        ref={textContainerRef}
        className="relative mt-auto mb-8 flex w-full items-end justify-center overflow-hidden"
      >
        <h1
          ref={textRef}
          className="m-0 w-full bg-secondary bg-clip-text p-0 text-center font-sans text-[20vw] leading-[0.8] font-black tracking-tight text-transparent dark:bg-primary"
        >
          LUICCIAN
        </h1>
      </div>
    </footer>
  );
}
