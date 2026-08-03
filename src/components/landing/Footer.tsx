import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <polygon points="0,64 20,0 28,0 8,64" fill="currentColor" />
      <polygon points="18,64 38,0 46,0 26,64" fill="currentColor" />
      <polygon points="36,64 56,0 64,0 44,64" fill="currentColor" />
    </svg>
  );
}

export default function LandingFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setIsVisible(window.scrollY > 300);
    toggle();
    window.addEventListener('scroll', toggle, { passive: true });
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useGSAP(
    () => {
      if (!footerRef.current) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (navRef.current) {
          gsap.fromTo(
            navRef.current.querySelectorAll('.footer-col'),
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: navRef.current,
                start: 'top 90%',
                once: true,
              },
            }
          );
        }
        if (wordmarkRef.current) {
          gsap.fromTo(
            wordmarkRef.current,
            { yPercent: 60, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: wordmarkRef.current,
                start: 'top 100%',
                end: 'bottom bottom',
                scrub: 1.2,
              },
            }
          );
        }
      });
      return () => mm.revert();
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-black/10 bg-[#FEFFA7] font-sans"
    >
      {/* ── Nav columns ── */}
      <div ref={navRef} className="px-10 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Platform */}
          <div className="footer-col flex flex-col gap-4 opacity-0">
            <h4 className="font-sans text-[10px] font-black tracking-[0.2em] text-black uppercase">
              Platform
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Calculator', href: '/App' },
                { label: 'AI Assistant', href: '/chat' },
                { label: 'Scoring Matrix', href: '#' },
                { label: 'Method Overview', href: '#' },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="font-sans text-sm text-black/50 transition-colors hover:text-black"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="footer-col flex flex-col gap-4 opacity-0">
            <h4 className="font-sans text-[10px] font-black tracking-[0.2em] text-black uppercase">
              Resources
            </h4>
            <div className="flex flex-col gap-2">
              {[
                {
                  label: 'Core Algorithm',
                  href: 'https://github.com/LuiccianDev/NicholasMethod81',
                },
                {
                  label: 'Technical Docs',
                  href: 'https://github.com/LuiccianDev/NicholasMethod81',
                },
                {
                  label: 'Estimation Guide',
                  href: 'https://github.com/LuiccianDev/NicholasMethod81',
                },
                { label: 'Nicholas 1981 Paper', href: '#' },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    l.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="font-sans text-sm text-black/50 transition-colors hover:text-black"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="footer-col flex flex-col gap-4 opacity-0">
            <h4 className="font-sans text-[10px] font-black tracking-[0.2em] text-black uppercase">
              Company
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: 'About', href: '#' },
                { label: 'GitHub', href: 'https://github.com/LuiccianDev' },
                {
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/in/william-guevara-lazaro-79274b2a3',
                },
                {
                  label: 'Instagram',
                  href: 'https://www.instagram.com/luiccian_dev',
                },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    l.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="font-sans text-sm text-black/50 transition-colors hover:text-black"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="footer-col flex flex-col gap-4 opacity-0">
            <h4 className="font-sans text-[10px] font-black tracking-[0.2em] text-black uppercase">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <div>
                <p className="font-sans text-[10px] font-black tracking-[0.1em] text-black uppercase">
                  General inquiries:
                </p>
                <a
                  href="https://github.com/LuiccianDev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-black/50 transition-colors hover:text-black"
                >
                  github.com/LuiccianDev
                </a>
              </div>
              <div className="mt-2 flex flex-col gap-2">
                <button
                  onClick={scrollToTop}
                  className="w-full cursor-pointer bg-black py-3 font-sans text-[10px] font-black tracking-[0.2em] text-white uppercase transition-opacity hover:opacity-80"
                >
                  Start Free
                </button>
                <a
                  href="/chat"
                  className="w-full border border-black py-3 text-center font-sans text-[10px] font-black tracking-[0.2em] text-black uppercase transition-opacity hover:opacity-60"
                >
                  Ask the AI
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Wordmark ── */}
      <div className="pointer-events-none overflow-hidden select-none">
        <div
          ref={wordmarkRef}
          className="flex items-end gap-[0.03em] px-5 pb-0 opacity-0"
          style={{ lineHeight: 1 }}
        >
          <LogoMark className="mb-[0.02em] h-[0.72em] w-auto shrink-0 text-black" />
          <span
            className="block w-full text-black"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(4.5rem, 18vw, 22rem)',
              lineHeight: 1,
              letterSpacing: '-0.01em',
            }}
          >
            LUICCIAN
          </span>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-black/10 px-10 py-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-6 font-sans text-[10px] tracking-[0.15em] text-black/40 uppercase">
            <span>Nicholas Method</span>
            <span>——</span>
            <a href="#" className="transition-colors hover:text-black">
              Terms &amp; Conditions
            </a>
            <a href="#" className="transition-colors hover:text-black">
              Privacy Policy
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-sans text-[10px] tracking-[0.15em] text-black/40 uppercase">
              © {new Date().getFullYear()} Luiccian. All rights reserved.
            </span>
            <AnimatePresence>
              {isVisible && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToTop}
                  className="cursor-pointer border border-black/20 px-3 py-1 font-sans text-[9px] tracking-[0.15em] text-black/50 uppercase transition-colors hover:border-black hover:text-black"
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
