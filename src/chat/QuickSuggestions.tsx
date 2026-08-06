import { Sparkles } from 'lucide-react';

export default function QuickSuggestions({
  prompts,
  onSelect,
  disabled,
}: {
  prompts: string[];
  onSelect: (text: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="border-t border-border/40 bg-primary/8 px-3 py-2">
      <div className="mb-1 flex items-center gap-1 font-monserrate text-[10px] tracking-wider uppercase">
        <Sparkles size={11} className="text-primary" />
        <span>Quick Suggestions</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {prompts.map((promptText, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(promptText)}
            disabled={disabled}
            className="rounded-md border border-border px-2.5 py-1 text-xs transition-all hover:border-quaternary hover:bg-secondary/20 active:scale-95 disabled:opacity-50"
          >
            {promptText}
          </button>
        ))}
      </div>
    </div>
  );
}
