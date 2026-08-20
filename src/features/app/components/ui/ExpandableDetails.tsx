import { type ReactNode, useEffect, useRef, useState } from 'react';

interface ExpandableDetailsProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
  summaryClassName?: string;
  labelOpen?: string;
  labelClosed?: string;
}

export default function ExpandableDetails({
  title,
  defaultOpen = false,
  children,
  className,
  summaryClassName,
  labelOpen = 'OPEN',
  labelClosed = 'CLOSED',
}: ExpandableDetailsProps) {
  const ref = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    if (ref.current) {
      ref.current.open = defaultOpen;
    }
  }, []);

  const handleToggle = () => {
    if (ref.current) {
      setIsOpen(ref.current.open);
    }
  };

  return (
    <details ref={ref} className={className} onToggle={handleToggle}>
      <summary className={summaryClassName}>
        <span>{title}</span>
        <span className="tracking-widest">
          {isOpen ? labelOpen : labelClosed}
        </span>
      </summary>
      {children}
    </details>
  );
}
