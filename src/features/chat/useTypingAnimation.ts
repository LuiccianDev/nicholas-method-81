import { useState, useRef, useCallback, useEffect } from 'react';

interface TypingState {
  activeId: string | null;
  typedLengthMap: Record<string, number>;
}

export function useTypingAnimation() {
  const [{ activeId, typedLengthMap }, setState] = useState<TypingState>({
    activeId: null,
    typedLengthMap: {},
  });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setState({ activeId: null, typedLengthMap: {} });
  }, []);

  const start = useCallback((msgId: string, fullText: string) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setState({ activeId: msgId, typedLengthMap: { [msgId]: 0 } });
    let current = 0;
    timerRef.current = setInterval(() => {
      current = Math.min(current + 2, fullText.length);
      setState((prev) => ({
        activeId: msgId,
        typedLengthMap: { ...prev.typedLengthMap, [msgId]: current },
      }));
      if (current >= fullText.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        setState({ activeId: null, typedLengthMap: {} });
      }
    }, 16);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const getDisplayedText = (msgId: string, content: string) => {
    if (activeId === msgId && typedLengthMap[msgId] !== undefined) {
      return content.slice(0, typedLengthMap[msgId]);
    }
    return content;
  };

  return { activeId, typedLengthMap, start, stop, getDisplayedText };
}
