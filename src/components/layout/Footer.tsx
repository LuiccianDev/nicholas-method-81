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

          // Intro reveal for CTA card texts.
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
      className="relative flex min-h-[58vh] flex-col justify-between overflow-hidden border-t border-border bg-surface pt-16 font-sans"
    >
      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[#381525]/30 bg-linear-to-br from-[#230d17] via-[#2d111d] to-[#1a0a11] p-7 text-[#ffecc0] shadow-2xl md:p-10">
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-linear-to-tr from-[#b95e82]/20 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-linear-to-bl from-[#f39f9f]/10 to-transparent blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">
              <h3
                ref={titleRef}
                className="font-serif text-2xl leading-snug font-bold tracking-tight text-[#ffecc0] italic sm:text-[1.7rem] lg:text-3xl"
              >
                Evaluating deposit viability with numerical mechanics logic.
              </h3>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-5">
              <p
                ref={descriptionRef}
                className="font-mono text-[10px] leading-relaxed tracking-widest text-[#dec9a4] uppercase"
              >
                Assess geomechanical conditions, grade distributions, and
                deposit geometry with David Nicholas' optimized selection
                engine.
              </p>

              <div
                ref={detailsRef}
                className="flex flex-wrap items-center gap-4"
              >
                <button
                  onClick={scrollToTop}
                  className="group flex cursor-pointer items-center gap-2 rounded-full bg-[#ffecc0] px-6 py-3 font-mono text-[10px] font-bold tracking-widest text-[#230d17] uppercase shadow-md transition-all duration-300 hover:scale-[1.03] hover:bg-[#ffecc0]/90 active:scale-[0.98]"
                >
                  Get started 🪄
                </button>
                <a
                  href="https://github.com/LuiccianDev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex cursor-pointer items-center gap-1.5 px-4 py-3 font-mono text-[10px] font-bold tracking-widest text-[#ffecc0] uppercase transition-all duration-300 hover:scale-[1.03] hover:text-white active:scale-[0.98]"
                >
                  ▶ Watch details guide
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-12 w-full max-w-6xl px-6 sm:px-8 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-start lg:col-span-5">
            <div className="mb-4 font-sans text-3xl font-black tracking-tighter text-foreground uppercase select-none">
              luiccian<span className="text-secondary">.</span>
            </div>
            <p className="max-w-sm font-sans text-xs leading-relaxed text-foreground-muted">
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
              <h4 className="network-title font-mono text-[10px] font-bold tracking-[0.2em] text-secondary uppercase opacity-80">
                Selector
              </h4>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={scrollToTop}
                  className="footer-link w-fit cursor-pointer text-left font-sans text-[13px] text-foreground-muted transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  About Selector
                </button>
                <button
                  onClick={scrollToTop}
                  className="footer-link w-fit cursor-pointer text-left font-sans text-[13px] text-foreground-muted transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  Optimization Logic
                </button>
                <button
                  onClick={scrollToTop}
                  className="footer-link w-fit cursor-pointer text-left font-sans text-[13px] text-foreground-muted transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  Scoring Matrix
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="network-title font-mono text-[10px] font-bold tracking-[0.2em] text-secondary uppercase opacity-80">
                Resources
              </h4>
              <div className="flex flex-col space-y-2">
                <a
                  href="https://github.com/LuiccianDev/NicholasMethod81"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link w-fit font-sans text-[13px] text-foreground-muted transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  Core Algorithm
                </a>
                <a
                  href="https://github.com/LuiccianDev/NicholasMethod81"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link w-fit font-sans text-[13px] text-foreground-muted transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  Technical Docs
                </a>
                <a
                  href="https://github.com/LuiccianDev/NicholasMethod81"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link w-fit font-sans text-[13px] text-foreground-muted transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  Estimation Guide
                </a>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="network-title font-mono text-[10px] font-bold tracking-[0.2em] text-secondary uppercase opacity-80">
                Network
              </h4>
              <div className="flex flex-col space-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link w-fit font-sans text-[13px] text-foreground-muted transition-all duration-300 hover:translate-x-1 hover:text-primary"
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
        className="pointer-events-none relative mt-auto flex w-full items-end justify-center py-4 select-none"
      >
        <h1
          ref={textRef}
          className="m-0 text-center font-sans   text-[clamp(72px,20vw,350px)] leading-none font-black tracking-tight uppercase antialiased  select-none"
        >
          LUICCIAN
        </h1>
      </div>

      {/* 4. Bottom Utilities Row & Copyright */}
      <div className="relative z-20 w-full border-t border-border bg-surface px-6 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left: Interactive status pill badge */}
          <div className="flex w-fit cursor-default items-center gap-2 rounded-full border border-border bg-surface-muted px-4 py-2 shadow-xs transition-all duration-300 hover:bg-card">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[9px] font-semibold tracking-wider text-foreground-muted uppercase">
              All systems operational
            </span>
          </div>

          {/* Right: copyright text & legal links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10px] text-foreground-muted">
            <span>
              © {new Date().getFullYear()} luiccian. All rights reserved.
            </span>
            <a href="#" className="transition-colors hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Terms of Use
            </a>

            <AnimatePresence>
              {isVisible && (
                <motion.button
                  id="back-to-top"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToTop}
                  className="ml-auto cursor-pointer rounded-sm bg-secondary px-3 py-1 font-mono text-[9px] tracking-wider text-surface uppercase transition-all duration-300 hover:bg-primary"
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
