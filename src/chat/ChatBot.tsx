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
          <div className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap">
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

function LoadingDots() {
  return (
    <div className="flex items-start gap-2">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-background">
        <Bot size={14} />
      </div>
      <div className="rounded-2xl border border-border/50 bg-background px-4 py-3 text-sm">
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

  const hasStarted = messages.some((m) => m.role === 'user');
  const displayMessages = messages.filter(
    (m) => m.id !== 'welcome' && m.id !== 'welcome-reset'
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-4 z-50 flex size-13 cursor-pointer items-center justify-center bg-secondary transition-all duration-300 hover:scale-110 active:scale-95 md:right-6 md:bottom-6"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X size={30} />
        ) : (
          <IconHelmet className="size-15 text-secondary" />
        )}
      </button>

      <div
        className={`fixed right-4 bottom-20 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-xl transition-all duration-300 md:right-6 md:bottom-22 ${
          isOpen
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0'
        }`}
        style={{ maxHeight: '60vh', height: '600px' }}
      >
        <div className="flex items-center justify-between bg-secondary px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/50">
              <Bot size={20} />
            </div>

            <h3 className="font-boldonse text-[12px] leading-tight">
              Nicholas 81 Assistant
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={clearChat}
              className="flex size-8 cursor-pointer items-center justify-center"
              title="Reset chat"
              aria-label="Reset chat history"
            >
              <Trash2 size={20} />
            </button>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setIsOpen(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsOpen(false);
                }
              }}
              className="flex size-8 cursor-pointer items-center justify-center transition-colors hover:bg-background/20"
              title="Close chat"
              aria-label="Close chat"
            >
              <X size={20} />
            </div>
          </div>
        </div>

        <div className="scroll-elegant flex-1 space-y-3 overflow-y-auto p-4">
          {displayMessages.length === 0 ? (
            <div className="flex min-h-full flex-col items-center justify-center gap-3 px-2 text-center">
              <p className="font-boldonse text-[20px] leading-relaxed">
                Ask me about Nicholas Method 81 geotechnical inputs and method
                selection.
              </p>
            </div>
          ) : (
            displayMessages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg}
                isTyping={activeTypingId === msg.id}
                displayedText={getDisplayedText(msg.id, msg.content)}
                copiedId={copiedId}
                onCopy={handleCopy}
              />
            ))
          )}

          {isLoading && <LoadingDots />}

          <div ref={messagesEndRef} />
        </div>

        {!hasStarted && (
          <QuickSuggestions
            prompts={quickPrompts}
            onSelect={sendMessage}
            disabled={isLoading}
          />
        )}

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
              className="flex-1 rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
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
