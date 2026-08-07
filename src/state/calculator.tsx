import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
  useTransition,
  useEffect,
  type ReactNode,
} from 'react';
import type { RawMethodInput, ScoredMethod, ChartDataRow } from '@/types';
import { calculateScores } from '@/lib/nicholas/calculateScores';
import { deriveMethodInput } from '@/lib/nicholas/categorizeInput';
import { publishCalculatorData } from './calculatorStore';

const DEFAULT_INPUT: RawMethodInput = {
  shape: 'I',
  thickness: 3,
  plunge: 70,
  grade: 'G',
  oreSubStr: 14,
  oreFracSpac: 16,
  oreFracStr: 'S',
  hwSubStr: 12,
  hwFracSpac: 14,
  hwFracStr: 'M',
  fwSubStr: 14,
  fwFracSpac: 15,
  fwFracStr: 'S',
};

interface NicholasContextType {
  input: RawMethodInput;
  updateInput: (key: keyof RawMethodInput, value: string | number) => void;
  setInputValues: (newInput: RawMethodInput) => void;
  results: ScoredMethod[];
  chartData: ChartDataRow[];
  absoluteBest: ScoredMethod | undefined;
  bestUnderground: ScoredMethod | undefined;
  isPending: boolean;
}

const NicholasContext = createContext<NicholasContextType | null>(null);

export function NicholasProvider({ children }: { children: ReactNode }) {
  const [input, setInput] = useState<RawMethodInput>(DEFAULT_INPUT);
  const [isPending, startTransition] = useTransition();

  const updateInput = useCallback(
    (key: keyof RawMethodInput, value: string | number) => {
      startTransition(() => {
        setInput((prev) => ({ ...prev, [key]: value }));
      });
    },
    []
  );

  const setInputValues = useCallback((newInput: RawMethodInput) => {
    startTransition(() => {
      setInput(newInput);
    });
  }, []);

  const derivedInput = useMemo(() => deriveMethodInput(input), [input]);
  const results = useMemo(() => calculateScores(derivedInput), [derivedInput]);

  const chartData = useMemo<ChartDataRow[]>(() => {
    return results
      .map((r) => ({
        name: r.method,
        Geometry: Math.max(0, r.geometryScore),
        RockMechanics: Math.max(0, r.rockTotal),
        Total: r.total,
        isEliminated: r.isEliminated,
      }))
      .filter((r) => !r.isEliminated);
  }, [results]);

  const absoluteBest = useMemo(
    () => results.find((r) => !r.isEliminated),
    [results]
  );

  const bestUnderground = useMemo(
    () => results.find((r) => r.method !== 'Open Pit' && !r.isEliminated),
    [results]
  );

  useEffect(() => {
    publishCalculatorData({
      input,
      results,
      bestUndergroundMethod: bestUnderground?.method,
      absoluteBestMethod: absoluteBest?.method,
    });
  }, [input, results, bestUnderground, absoluteBest]);

  return (
    <NicholasContext.Provider
      value={{
        input,
        updateInput,
        setInputValues,
        results,
        chartData,
        absoluteBest,
        bestUnderground,
        isPending,
      }}
    >
      {children}
    </NicholasContext.Provider>
  );
}

export function useNicholasContext() {
  const context = useContext(NicholasContext);
  if (!context) {
    throw new Error(
      'useNicholasContext must be used within a NicholasProvider'
    );
  }
  return context;
}
