import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Info } from 'lucide-react';
interface TooltipProps {
  content: string;
}

export default function Tooltip({ content }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    placeBelow: boolean;
  }>({ top: 0, left: 0, placeBelow: false });

  const updatePosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const width = 288;
    const padding = 16;

    const iconCenter = rect.left + rect.width / 2;
    const desiredLeft = iconCenter - width / 2;
    const maxLeft = window.innerWidth - width - padding;
    const left = Math.max(padding, Math.min(maxLeft, desiredLeft));

    const placeBelow = rect.top < 160;

    setCoords({
      top: placeBelow ? rect.bottom + 8 : rect.top - 8,
      left,
      placeBelow,
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    const handleScrollOrResize = () => updatePosition();
    const handleClickOutside = (e: MouseEvent) => {
      if (
        buttonRef.current?.contains(e.target as Node) ||
        popoverRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      setIsOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="inline-flex items-center">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center justify-center px-1 font-mono transition-colors select-none active:scale-95"
        title="Click to toggle info note"
        aria-label="Toggle info note"
      >
        <Info size={12} />
      </button>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={popoverRef}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  y: coords.placeBelow ? -4 : 4,
                }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: coords.placeBelow ? -4 : 4,
                }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                style={{
                  position: 'fixed',
                  left: `${coords.left}px`,
                  ...(coords.placeBelow
                    ? { top: `${coords.top}px` }
                    : { bottom: `${window.innerHeight - coords.top}px` }),
                }}
                className="wrap-break-words z-9999 w-72 max-w-[calc(100vw-2rem)] rounded-md border border-border bg-background p-3.5 text-left text-[11px] leading-relaxed tracking-normal whitespace-normal normal-case not-italic"
              >
                <div>{content}</div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
