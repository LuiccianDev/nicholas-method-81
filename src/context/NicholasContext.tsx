import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from 'react';
import type { RawMethodInput, ScoredMethod, ChartDataRow } from '../types';
import { calculateScores, deriveMethodInput } from '../lib/nicholasData';

const DEFAULT_INPUT: RawMethodInput = {
  shape: 'M',
  thickness: 20,
  plunge: 45,
  depth: 500,
  grade: 'U',
  oreSubStr: 10,
  oreFracSpac: 12,
  oreFracStr: 'M',
  hwSubStr: 10,
  hwFracSpac: 12,
  hwFracStr: 'M',
  fwSubStr: 10,
  fwFracSpac: 12,
  fwFracStr: 'M',
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
        isEliminated: r.total < 0 || r.geometryScore < 0 || r.rockTotal < 0,
      }))
      .filter((r) => !r.isEliminated);
  }, [results]);

  const absoluteBest = useMemo(
    () =>
      results.find(
        (r) => !(r.total < 0 || r.geometryScore < 0 || r.rockTotal < 0)
      ),
    [results]
  );

  const bestUnderground = useMemo(
    () =>
      results.find(
        (r) =>
          r.method !== 'Open Pit' &&
          !(r.total < 0 || r.geometryScore < 0 || r.rockTotal < 0)
      ),
    [results]
  );

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
