import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

          const introTimeline = gsap.timeline({
            defaults: {
              duration: mainDuration,
              ease: 'power2.out',
            },
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              once: true,
            },
          });

          if (titleRef.current) {
            introTimeline.from(titleRef.current, {
              y: reduceMotion ? 0 : 30,
              autoAlpha: reduceMotion ? 1 : 0,
            });
          }

          if (descriptionRef.current) {
            introTimeline.from(
              descriptionRef.current,
              {
                y: reduceMotion ? 0 : 20,
                autoAlpha: reduceMotion ? 1 : 0,
              },
              reduceMotion ? '>' : '-=0.7'
            );
          }

          if (detailsRef.current) {
            gsap.from(detailsRef.current, {
              scrollTrigger: {
                trigger: detailsRef.current,
                start: 'top 90%',
                once: true,
              },
              scale: reduceMotion ? 1 : 0.92,
              autoAlpha: reduceMotion ? 1 : 0,
              duration: reduceMotion ? 0 : 0.8,
              ease: 'back.out(1.5)',
            });
          }

          if (footerLinks.length) {
            gsap.fromTo(
              footerLinks,
              {
                x: reduceMotion ? 0 : desktop ? 30 : 15,
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
                stagger: reduceMotion ? 0 : 0.08,
                duration: reduceMotion ? 0 : 0.6,
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
                duration: reduceMotion ? 0 : 0.6,
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
                  yPercent: 80,
                  autoAlpha: 0,
                  scale: 0.95,
                },
                {
                  yPercent: 0,
                  autoAlpha: 1,
                  scale: 1,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: textContainerRef.current,
                    start: 'top 98%',
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
      className="relative flex min-h-[70vh]  flex-col justify-between"
    >
      <div className="relative z-20 mb-5 w-full px-5">
        <div className="relative overflow-hidden bg-[url('/footer.jpeg')] bg-center px-6  pt-30 pb-5">
          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-5 text-center">
            <h3
              ref={titleRef}
              className="font-boldonse text-xl tracking-tight text-pretty text-white sm:text-2xl lg:text-3xl"
            >
              Evaluating deposit viability with numerical mechanics logic.
            </h3>

            <p
              ref={descriptionRef}
              className="max-w-2xl text-[11px] leading-relaxed tracking-wider text-pretty text-white/90 uppercase sm:text-sm"
            >
              Assess geomechanical conditions, grade distributions, and deposit
              geometry with David Nicholas' optimized selection engine.
            </p>

            <div
              ref={detailsRef}
              className="flex flex-wrap items-center justify-center gap-3 pt-1 text-[12px] font-bold sm:gap-4"
            >
              <button
                onClick={scrollToTop}
                className="group flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-primary/90 px-6 py-3.5 tracking-wide text-black uppercase backdrop-blur-2xl transition-all duration-300 hover:scale-[1.03] hover:bg-primary  active:scale-95"
              >
                Get started
              </button>
              <a
                href="https://github.com/LuiccianDev"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex cursor-pointer items-center gap-2 rounded-sm border border-white/30 bg-white/10 px-5 py-3.5 tracking-wider text-white uppercase backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:bg-white/20 active:scale-95"
              >
                <span>▶ Watch details guide</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-start lg:col-span-5">
            <div className="mb-4 text-3xl tracking-tighter uppercase select-none">
              luiccian
            </div>
            <p className="max-w-sm text-[12px] leading-relaxed">
              There is no risk-free extraction, only optimized selection.
              Nicholas numerical matrix assesses core geometries and rock
              conditions to refine mining pathways.
            </p>
          </div>

          <div
            ref={linksRef}
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:gap-4"
          >
            <div className="flex flex-col space-y-4">
              <h4 className="network-title font-mono text-[14px] font-bold tracking-wide uppercase">
                Selector
              </h4>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={scrollToTop}
                  className="footer-link w-fit cursor-pointer text-left text-[13px] transition-all duration-300 hover:translate-x-1"
                >
                  About Selector
                </button>
                <button
                  onClick={scrollToTop}
                  className="footer-link w-fit cursor-pointer text-left text-[13px] transition-all duration-300 hover:translate-x-1"
                >
                  Optimization Logic
                </button>
                <button
                  onClick={scrollToTop}
                  className="footer-link w-fit cursor-pointer text-left text-[13px] transition-all duration-300 hover:translate-x-1"
                >
                  Scoring Matrix
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="network-title font-mono text-[14px] font-bold tracking-wide uppercase">
                Resources
              </h4>
              <div className="flex flex-col space-y-2">
                <a
                  href="https://github.com/LuiccianDev/NicholasMethod81"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link w-fit text-[13px] transition-all duration-300 hover:translate-x-1"
                >
                  Core Algorithm
                </a>
                <a
                  href="https://github.com/LuiccianDev/NicholasMethod81"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link w-fit text-[13px] transition-all duration-300 hover:translate-x-1"
                >
                  Technical Docs
                </a>
                <a
                  href="https://github.com/LuiccianDev/NicholasMethod81"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link w-fit text-[13px] transition-all duration-300 hover:translate-x-1"
                >
                  Estimation Guide
                </a>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="network-title font-mono text-[14px] font-bold tracking-wide uppercase">
                Network
              </h4>
              <div className="flex flex-col space-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link w-fit text-[13px] transition-all duration-300 hover:translate-x-1"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={textContainerRef}
        className="pointer-events-none relative mt-auto flex w-full items-end justify-center select-none"
      >
        <h1
          ref={textRef}
          className="mx-0 mt-25 text-center font-boldonse text-[clamp(50px,15vw,270px)] leading-none font-black tracking-tight text-black uppercase antialiased select-none"
        >
          LUICCIAN
        </h1>
      </div>

      <div className="relative z-20 w-full px-6 pt-15 text-[14px] sm:px-8 lg:px-12">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <span className="tracking-wider">All systems operational</span>

          <div className="flex flex-wrap items-center gap-x-6">
            <span>
              © {new Date().getFullYear()} luiccian. All rights reserved.
            </span>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>

            <AnimatePresence>
              {isVisible && (
                <motion.button
                  id="back-to-top"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}  
                  onClick={scrollToTop}
                  className="ml-auto cursor-pointer rounded-sm bg-primary/90 backdrop-blur-3xl px-3 py-1 tracking-wider uppercase transition-all duration-300 hover:bg-primary "
                >
                  ↑ TOP
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </footer>
  );
}
