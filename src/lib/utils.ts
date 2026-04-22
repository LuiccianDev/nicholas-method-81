export function cn(...inputs: unknown[]) {
  return inputs.flat().filter(Boolean).join(' ');
}
