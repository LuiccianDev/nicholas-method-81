import { useRef, useState, useEffect } from 'react';
import { X, Send, Bot, Trash2 } from 'lucide-react';
import IconHelmet from '@/components/icons/IconHelmet';
import { useChat } from './useChat';
import QuickSuggestions from './QuickSuggestions';
import LoadingDots from './LoadingDots';
import ChatBubble from './ChatBubble';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const playedRef = useRef(false);
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

  useGSAP(
    () => {
      if (!isOpen || playedRef.current || !textRef.current) return;
      playedRef.current = true;

      const split = SplitText.create(textRef.current, {
        type: 'words,chars',
        wordsClass: 'inline-block whitespace-nowrap',
      });
      gsap.from(split.chars, {
        opacity: 0.1,
        scale: 0.8,
        filter: 'blur(4px)',
        stagger: { each: 0.01, from: 'center' },
        duration: 0.2,
        ease: 'power2.out',
      });
    },
    { dependencies: [isOpen] }
  );

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
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-4 z-50 flex size-13 cursor-pointer items-center justify-center rounded-xl bg-secondary transition-all duration-300 hover:scale-110 active:scale-95 md:right-6 md:bottom-6"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <IconHelmet className="size-15 rounded-xl text-primary" />
      </motion.button>

      <div
        className={`fixed right-4 bottom-20 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-md border border-border bg-background shadow-xl transition-all duration-300 md:right-6 md:bottom-22 ${
          isOpen
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0'
        }`}
        style={{ maxHeight: '60vh', height: '600px' }}
      >
        <div className="flex items-center justify-between bg-background border-b border-tertiary px-4 py-3">

            <h3 className="font-boldonse text-[12px] leading-tight">
              Nicholas 81 Assistant
            </h3>

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
            <p
              ref={textRef}
              className="px-4 pt-15 text-center font-boldonse text-[25px] text-pretty"
            >
              Ask me about Nicholas Method
            </p>
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
