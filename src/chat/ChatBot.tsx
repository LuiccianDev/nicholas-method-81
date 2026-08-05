import { useState, useEffect, type ReactNode } from 'react';
import {
  X,
  Send,
  Bot,
  User,
  Trash2,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import IconHelmet from '../App/icons/IconHelmet';
import { useChat, type ChatMessage } from '../hooks/useChat';

function ChatBubble({
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
      className={`group relative flex items-start gap-2 ${
        message.role === 'user' ? 'flex-row-reverse' : ''
      }`}
    >
      <div
        className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[8px] font-semibold ${
          message.role === 'user'
            ? 'bg-primary text-white'
            : 'bg-surface-muted text-foreground'
        }`}
      >
        {message.role === 'user' ? <User size={14} /> : <Bot size={14} />}
      </div>
      {message.role === 'assistant' ? (
        <div className="flex max-w-[85%] flex-col">
          <div className="rounded-lg border border-border/50 bg-surface-muted px-3.5 py-2.5 text-[12px] leading-relaxed whitespace-pre-wrap text-foreground">
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
                className="flex cursor-pointer items-center gap-1 rounded p-1 text-foreground-muted transition-colors hover:bg-surface hover:text-foreground"
                title="Copy message"
              >
                {copiedId === message.id ? (
                  <Check size={12} className="text-green-500" />
                ) : (
                  <Copy size={12} />
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-[85%] rounded-lg bg-primary px-3.5 py-2.5 text-[12px] leading-relaxed whitespace-pre-wrap text-white">
          {displayedText}
        </div>
      )}
    </div>
  );
}

function LoadingDots() {
  return (
    <div className="flex items-start gap-2">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-muted text-foreground">
        <Bot size={14} />
      </div>
      <div className="rounded-2xl border border-border/50 bg-surface-muted px-4 py-3 text-sm text-foreground-muted">
        <div className="flex items-center gap-1.5">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="size-1.5 animate-bounce rounded-full bg-primary"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickSuggestions({
  prompts,
  onSelect,
  disabled,
}: {
  prompts: string[];
  onSelect: (text: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="border-t border-border/50 bg-surface-muted/30 px-3 py-2">
      <div className="mb-1 flex items-center gap-1 text-[10px] font-medium tracking-wider text-foreground-muted uppercase">
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
            className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs text-foreground-muted transition-all hover:border-primary hover:text-foreground hover:shadow-xs active:scale-95 disabled:opacity-50"
          >
            {promptText}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    messages,
    input,
    setInput,
    isLoading,
    copiedId,
    activeTypingId,
    getDisplayedText,
    messagesEndRef,
    inputRef,
    sendMessage,
    handleKeyDown,
    handleCopy,
    clearChat,
    bestUndergroundMethod,
    absoluteBestMethod,
  } = useChat();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, inputRef]);

  const topMethodName =
    bestUndergroundMethod || absoluteBestMethod || 'recommended method';
  const quickPrompts = [
    'Why is Open Pit set aside for underground selection?',
    `Why is ${topMethodName} recommended?`,
    'Summarize my geotechnical case',
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-4 z-50 flex size-10 cursor-pointer items-center justify-center border border-border bg-[#b95e82] text-white transition-all duration-300 hover:scale-110 active:scale-95 md:right-6 md:bottom-6"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X size={20} />
        ) : (
          <IconHelmet className="size-10 text-[#b95e82]" />
        )}
      </button>

      <div
        className={`fixed right-4 bottom-20 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl transition-all duration-300 md:right-6 md:bottom-22 ${
          isOpen
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0'
        }`}
        style={{ maxHeight: '50vh', height: '500px' }}
      >
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
              <Bot size={18} />
            </div>
            <div>
              <h3 className="text-sm leading-tight font-semibold">
                Nicholas 81 Assistant
              </h3>
              <p className="text-[10px]">Geotechnical Mining AI</p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg transition-colors"
            title="Reset chat"
            aria-label="Reset chat history"
          >
            <Trash2 size={15} />
          </button>
        </div>

        <div className="scroll-elegant flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg}
              isTyping={activeTypingId === msg.id}
              displayedText={getDisplayedText(msg.id, msg.content)}
              copiedId={copiedId}
              onCopy={handleCopy}
            />
          ))}

          {isLoading && <LoadingDots />}

          <div ref={messagesEndRef} />
        </div>

        <QuickSuggestions
          prompts={quickPrompts}
          onSelect={sendMessage}
          disabled={isLoading}
        />

        <div className="flex flex-col gap-1 border-t border-border p-3">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              maxLength={500}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question (max 500 chars)..."
              className="flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="flex size-9 cursor-pointer items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="flex justify-end px-1 text-[10px]">
            <span>{input.length}/500</span>
          </div>
        </div>
      </div>
    </>
  );
}
