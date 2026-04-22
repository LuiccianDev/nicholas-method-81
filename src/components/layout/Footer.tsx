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
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
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

      // Smooth entry for H4 and P
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      tl.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      }).from(
        descriptionRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.7'
      );

      // Surprising animation for the details div
      gsap.from(detailsRef.current, {
        scrollTrigger: {
          trigger: detailsRef.current,
          start: 'top 90%',
          once: true,
        },
        scale: 0.8,
        rotationX: 45,
        opacity: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
      });

      // Lateral animations for links
      gsap.fromTo(
        '.footer-link',
        {
          x: 50,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: linksRef.current,
            start: 'top 95%',
            once: true,
          },
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      // Animate network title too
      gsap.fromTo(
        '.network-title',
        { opacity: 0, y: 10 },
        {
          scrollTrigger: {
            trigger: linksRef.current,
            start: 'top 95%',
            once: true,
          },
          opacity: 0.8,
          y: 0,
          duration: 0.8,
        }
      );

      // Big text reveal (existing)
      if (textRef.current && textContainerRef.current) {
        gsap.fromTo(
          textRef.current,
          {
            y: '100%',
            opacity: 0,
            scale: 0.9,
          },
          {
            y: '0%',
            opacity: 1,
            scale: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textContainerRef.current,
              start: 'top 95%',
              end: 'bottom bottom',
              scrub: 1.5,
            },
          }
        );
      }
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="border-border bg-surface relative flex min-h-screen flex-col justify-between overflow-hidden border-t pt-24 font-sans"
    >
      {/* Top Grid - Description & Links (wrapped with padding instead of footer) */}
      <div className="relative z-20 grid grid-cols-1 gap-16 px-8 lg:grid-cols-12 lg:gap-12 lg:px-20">
        {/* Left Column - Project Description */}
        <div className="flex flex-col justify-start lg:col-span-7 lg:pr-12">
          <h4
            ref={titleRef}
            className="text-primary mb-8 font-serif text-4xl leading-tight tracking-tight italic lg:text-6xl"
          >
            Mining Underground
          </h4>
          <p
            ref={descriptionRef}
            className="text-foreground-muted mb-12 max-w-2xl font-sans text-[16px] leading-relaxed"
          >
            A numerical decision system for selecting the most suitable mining
            method. It evaluates the technical compatibility of various methods
            by comparing the characteristics of your deposit with the
            requirements of each.
          </p>
          <div
            ref={detailsRef}
            className="border-border flex flex-col gap-12 border-t pt-10 sm:flex-row"
          >
            <div className="flex flex-col space-y-2">
              <span className="text-secondary font-mono text-[11px] tracking-[0.2em] uppercase opacity-80">
                Core Algorithm
              </span>
              <span className="text-foreground text-sm font-medium tracking-wide">
                Nicholas Approach
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-secondary font-mono text-[11px] tracking-[0.2em] uppercase opacity-80">
                Discipline
              </span>
              <span className="text-foreground text-sm font-medium tracking-wide">
                Rock Mechanics
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-secondary font-mono text-[11px] tracking-[0.2em] uppercase opacity-80">
                Status
              </span>
              <span className="text-primary text-sm font-medium tracking-wide">
                Engine Active
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Social Links */}
        <div className="mt-12 flex flex-col justify-start lg:col-span-5 lg:mt-0 lg:items-end">
          <div ref={linksRef} className="flex flex-col space-y-8 lg:text-right">
            <h4 className="network-title text-secondary font-mono text-[11px] tracking-[0.2em] uppercase opacity-80">
              Network
            </h4>
            <div className="flex flex-col space-y-6">
              <a
                href="https://www.instagram.com/luiccian_dev"
                className="footer-link text-foreground hover:text-primary block w-full font-serif text-3xl italic transition-all duration-300 hover:-translate-x-2 lg:text-4xl"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/william-guevara-lazaro-79274b2a3"
                className="footer-link text-foreground hover:text-primary block w-full font-serif text-3xl italic transition-all duration-300 hover:-translate-x-2 lg:text-4xl"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/LuiccianDev"
                className="footer-link text-foreground hover:text-primary block w-full font-serif text-3xl italic transition-all duration-300 hover:-translate-x-2 lg:text-4xl"
              >
                GitHub
              </a>
            </div>

            <AnimatePresence>
              {isVisible && (
                <motion.button
                  id="back-to-top"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={scrollToTop}
                  className="bg-primary text-surface hover:bg-secondary mt-12 w-fit cursor-pointer px-8 py-3 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 lg:ml-auto"
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
        className="relative mt-auto flex w-full items-end justify-center overflow-hidden"
      >
        <h1
          ref={textRef}
          className="from-primary to-secondary m-0 w-full bg-linear-to-b bg-clip-text p-0 text-center font-sans text-[20vw] leading-[0.8] font-black tracking-tight text-transparent"
        >
          LUICCIAN
        </h1>
      </div>
    </footer>
  );
}
