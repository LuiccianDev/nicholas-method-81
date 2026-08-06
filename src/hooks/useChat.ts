import { useState, useRef, useEffect, useCallback } from 'react';
import {
  getCalculatorData,
  subscribeCalculatorData,
  type CalculatorSnapshot,
} from '../lib/nicholas/calculatorStore';
import { useTypingAnimation } from './useTypingAnimation';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const RESET_MESSAGE: ChatMessage = {
  id: 'welcome-reset',
  role: 'assistant',
  content: 'Chat history reset. Ask me anything about Nicholas Method 81.',
};
const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Hello! I am the Nicholas Method 81 assistant. How can I help you today?',
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bestUndergroundMethod, setBestUnderground] = useState<
    string | undefined
  >();
  const [absoluteBestMethod, setAbsoluteBest] = useState<string | undefined>();
  const calcDataRef = useRef<CalculatorSnapshot>(getCalculatorData());

  const {
    activeId: activeTypingId,
    start: triggerSmoothTyping,
    stop: stopTyping,
    getDisplayedText,
  } = useTypingAnimation();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsub = subscribeCalculatorData((data) => {
      calcDataRef.current = data;
      setBestUnderground(data.bestUndergroundMethod);
      setAbsoluteBest(data.absoluteBestMethod);
    });
    return unsub;
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTypingId, isLoading]);

  const sendMessage = useCallback(
    async (messageText?: string) => {
      const textToSend = (messageText ?? input).trim();
      if (!textToSend || isLoading) return;

      if (!messageText) setInput('');
      stopTyping();

      const userMessageId = `user-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        { id: userMessageId, role: 'user', content: textToSend },
      ]);
      setIsLoading(true);

      const {
        input: calcInput,
        results,
        bestUndergroundMethod,
        absoluteBestMethod,
      } = calcDataRef.current;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: textToSend,
            inputs: calcInput,
            bestUnderground: bestUndergroundMethod,
            absoluteBest: absoluteBestMethod,
            results: results.map((r) => ({
              method: r.method,
              geometryScore: r.geometryScore,
              rockTotal: r.rockTotal,
              total: r.total,
            })),
          }),
        });

        const data = await res.json();
        const assistantMessageId = `assistant-${Date.now()}`;
        const replyText = data.reply || 'Could not retrieve a response.';

        setMessages((prev) => [
          ...prev,
          { id: assistantMessageId, role: 'assistant', content: replyText },
        ]);

        if (res.ok && data.reply) {
          triggerSmoothTyping(assistantMessageId, replyText);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: 'assistant',
            content: 'Connection error. Please try again.',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, stopTyping, triggerSmoothTyping]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  const handleCopy = useCallback((id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const clearChat = useCallback(() => {
    stopTyping();
    setMessages([RESET_MESSAGE]);
  }, [stopTyping]);

  return {
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
  };
}
