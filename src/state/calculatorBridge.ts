import type { RawMethodInput, ScoredMethod } from '@/types';

export interface CalculatorSnapshot {
  input: RawMethodInput;
  results: ScoredMethod[];
  bestUndergroundMethod: string | undefined;
  absoluteBestMethod: string | undefined;
}

type Listener = (data: CalculatorSnapshot) => void;

let currentData: CalculatorSnapshot = {
  input: {} as RawMethodInput,
  results: [],
  bestUndergroundMethod: undefined,
  absoluteBestMethod: undefined,
};

const listeners = new Set<Listener>();

export function publishCalculatorData(data: CalculatorSnapshot) {
  currentData = data;
  listeners.forEach((fn) => fn(data));
}

export function getCalculatorData(): CalculatorSnapshot {
  return currentData;
}

export function subscribeCalculatorData(fn: Listener): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
