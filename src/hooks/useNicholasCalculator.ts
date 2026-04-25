import { useCallback, useMemo, useState, useTransition } from 'react';
import { type RawMethodInput, type ChartDataRow } from '../types';
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

/**
 * Custom hook to manage the Nicholas Method calculator state and logic.
 * Uses React 19 transitions to keep the UI responsive during calculations.
 */
export function useNicholasCalculator() {
  const [input, setInput] = useState<RawMethodInput>(DEFAULT_INPUT);
  const [isPending, startTransition] = useTransition();

  const updateInput = useCallback(
    (key: keyof RawMethodInput, value: string | number) => {
      // We use a transition to update the input state.
      // This allows the input fields to remain responsive while the
      // downstream calculations (useMemo) happen in the background.
      startTransition(() => {
        setInput((prev) => ({ ...prev, [key]: value }));
      });
    },
    []
  );

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

  return {
    input,
    updateInput,
    results,
    chartData,
    absoluteBest,
    bestUnderground,
    isPending,
  };
}
