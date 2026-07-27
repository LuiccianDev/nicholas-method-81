interface TooltipProps {
  content: string;
}

export default function Tooltip({ content }: TooltipProps) {
  return (
    <div className="group/tooltip relative inline-block min-w-0">
      <span className="cursor-help px-1 font-mono text-xxs text-foreground-muted transition-colors select-none hover:text-primary">
        ⓘ
      </span>
      <div className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 w-64 max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-card p-3 font-sans text-xxs leading-relaxed tracking-normal text-foreground-muted normal-case not-italic opacity-0 shadow-xl transition-opacity duration-200 group-hover/tooltip:opacity-100">
        {content}
      </div>
    </div>
  );
}
