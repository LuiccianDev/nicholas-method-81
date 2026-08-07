import { Bot, User, Copy, Check } from 'lucide-react';
import { type ChatMessage } from './useChat';

export default function ChatBubble({
  message,
  isTyping,
  displayedText,
  copiedId,
  onCopy,
}: {
  message: ChatMessage;
  isTyping: boolean;
  displayedText: string;
  copiedId: string | null;
  onCopy: (id: string, content: string) => void;
}) {
  return (
    <div
      className={`group relative flex items-start gap-2 font-roboto ${
        message.role === 'user' ? 'flex-row-reverse' : ''
      }`}
    >
      <div
        className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[8px] ${
          message.role === 'user' ? 'bg-primary' : 'bg-tertiary'
        }`}
      >
        {message.role === 'user' ? <User size={14} /> : <Bot size={14} />}
      </div>
      {message.role === 'assistant' ? (
        <div className="flex max-w-[85%] flex-col">
          <div className="bg-background px-3.5 py-2.5 text-[13px] leading-relaxed text-pretty whitespace-pre-wrap">
            {displayedText}
            {isTyping && (
              <span className="ml-0.5 animate-pulse font-bold text-primary">
                │
              </span>
            )}
          </div>
          {!isTyping && (
            <div className="mt-1 flex justify-end">
              <button
                onClick={() => onCopy(message.id, message.content)}
                className="flex cursor-pointer items-center gap-1 rounded p-1 transition-colors hover:bg-background"
                title="Copy message"
              >
                {copiedId === message.id ? (
                  <Check size={12} className="text-primary" />
                ) : (
                  <Copy size={12} />
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-[85%] rounded-lg bg-primary px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap">
          {displayedText}
        </div>
      )}
    </div>
  );
}
