import { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Trash2,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import { useNicholasContext } from '../../context/NicholasContext';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        '¡Hola! Soy tu asistente para el Método de Nicholas 81. Puedes hacer preguntas sobre la evaluación geotécnica, la selección del método o los resultados de tu cálculo.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Estado para la animación suave de tipeo/revelado de texto
  const [activeTypingId, setActiveTypingId] = useState<string | null>(null);
  const [typedLengthMap, setTypedLengthMap] = useState<Record<string, number>>(
    {}
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const {
    input: calcInput,
    results,
    absoluteBest,
    bestUnderground,
  } = useNicholasContext();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typedLengthMap, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  const triggerSmoothTyping = (msgId: string, fullText: string) => {
    setActiveTypingId(msgId);
    setTypedLengthMap((prev) => ({ ...prev, [msgId]: 0 }));

    let currentLength = 0;
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    typingTimerRef.current = setInterval(() => {
      // Avanzar de 2 en 2 caracteres para una velocidad fluida y elegante (~15-20ms)
      currentLength = Math.min(currentLength + 2, fullText.length);
      setTypedLengthMap((prev) => ({ ...prev, [msgId]: currentLength }));

      if (currentLength >= fullText.length) {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
        setActiveTypingId(null);
      }
    }, 16);
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText ?? input).trim();
    if (!textToSend || isLoading) return;

    if (!messageText) setInput('');

    // Si había una animación corriendo, cancelarla e instanciarla completa inmediatamente
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
      setActiveTypingId(null);
    }

    const userMessageId = `user-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: userMessageId, role: 'user', content: textToSend },
    ]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          inputs: calcInput,
          bestUnderground: bestUnderground?.method,
          absoluteBest: absoluteBest?.method,
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
      const replyText = data.reply || '❌ No se pudo obtener una respuesta.';

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
          content: '❌ Error de conexión. Intenta nuevamente.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setActiveTypingId(null);
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content:
          'Historial reiniciado. Hazme cualquier consulta sobre el Método de Nicholas 81.',
      },
    ]);
  };

  const topMethodName =
    bestUnderground?.method || absoluteBest?.method || 'el método recomendable';
  const quickPrompts = [
    `¿Por qué se descarta Open Pit en subterránea?`,
    `¿Por qué se recomienda ${topMethodName}?`,
    'Resume mi caso geotécnico',
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-4 z-50 flex size-14 cursor-pointer items-center justify-center rounded-full border border-border bg-primary text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 md:right-6 md:bottom-6"
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      <div
        className={`fixed right-4 bottom-20 z-50 flex w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300 md:right-6 md:bottom-22 ${
          isOpen
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0'
        }`}
        style={{ maxHeight: '75vh', height: '520px' }}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-border bg-surface-muted px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Bot size={18} />
            </div>
            <div>
              <h3 className="text-sm leading-tight font-semibold text-foreground">
                Asistente Nicholas 81
              </h3>
              <p className="text-[10px] text-foreground-muted">
                IA Geotécnica Minera
              </p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-surface hover:text-foreground"
            title="Reiniciar chat"
            aria-label="Reiniciar conversación"
          >
            <Trash2 size={15} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="scroll-elegant flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((msg) => {
            const isTyping = activeTypingId === msg.id;
            const textLength = typedLengthMap[msg.id];
            const displayedText =
              isTyping && textLength !== undefined
                ? msg.content.slice(0, textLength)
                : msg.content;

            return (
              <div
                key={msg.id}
                className={`group relative flex items-start gap-2 ${
                  msg.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    msg.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-surface-muted text-foreground'
                  }`}
                >
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div
                  className={`relative max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-primary text-white'
                      : 'border border-border/50 bg-surface-muted text-foreground'
                  }`}
                >
                  {displayedText}
                  {isTyping && (
                    <span className="ml-0.5 animate-pulse font-bold text-primary">
                      │
                    </span>
                  )}

                  {msg.role === 'assistant' && !isTyping && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="absolute top-1.5 right-1.5 hidden rounded p-1 text-foreground-muted opacity-0 transition-all group-hover:block group-hover:opacity-100 hover:bg-surface"
                      title="Copiar texto"
                    >
                      {copiedId === msg.id ? (
                        <Check size={12} className="text-green-500" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-muted text-foreground">
                <Bot size={14} />
              </div>
              <div className="rounded-2xl border border-border/50 bg-surface-muted px-4 py-3 text-sm text-foreground-muted">
                <div className="flex items-center gap-1.5">
                  <span
                    className="size-1.5 animate-bounce rounded-full bg-primary"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="size-1.5 animate-bounce rounded-full bg-primary"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="size-1.5 animate-bounce rounded-full bg-primary"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Dynamic Suggestion Chips */}
        <div className="border-t border-border/50 bg-surface-muted/30 px-3 py-2">
          <div className="mb-1 flex items-center gap-1 text-[10px] font-medium tracking-wider text-foreground-muted uppercase">
            <Sparkles size={11} className="text-primary" />
            <span>Sugerencias rápidas</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((promptText, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(promptText)}
                disabled={isLoading}
                className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs text-foreground-muted transition-all hover:border-primary hover:text-foreground hover:shadow-xs active:scale-95 disabled:opacity-50"
              >
                {promptText}
              </button>
            ))}
          </div>
        </div>

        {/* Input Footer */}
        <div className="flex flex-col gap-1 border-t border-border p-3">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              maxLength={500}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu consulta (máx 500 caracteres)..."
              className="flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none placeholder:text-foreground-muted/50 focus:border-primary focus:ring-1 focus:ring-primary"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="flex size-9 cursor-pointer items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Enviar mensaje"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="flex justify-end px-1 text-[10px] text-foreground-muted">
            <span>{input.length}/500</span>
          </div>
        </div>
      </div>
    </>
  );
}
