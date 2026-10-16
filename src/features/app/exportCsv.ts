import type { ScoredMethod } from '@/types';

function escapeCsv(value: string | number): string {
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function buildResultsCsv(results: ScoredMethod[]): string {
  const active = results
    .filter((r) => !r.isEliminated)
    .sort((a, b) => b.total - a.total);
  const eliminated = results.filter((r) => r.isEliminated);

  const rows = [
    'Rank,Method,Geometry,Rock Mechanics,Total,Status',
    ...active.map((r, i) =>
      [
        String(i + 1).padStart(2, '0'),
        escapeCsv(r.method),
        r.geometryScore,
        r.rockTotal,
        r.total,
        'Active',
      ].join(',')
    ),
    ...eliminated.map((r) =>
      [
        '-',
        escapeCsv(r.method),
        r.geometryScore,
        r.rockTotal,
        r.total,
        'Eliminated',
      ].join(',')
    ),
  ];

  return `\uFEFFsep=,\n${rows.join('\r\n')}`;
}

export function downloadResultsCsv(results: ScoredMethod[]): void {
  const csv = buildResultsCsv(results);
  const date = new Date().toISOString().slice(0, 10);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `nicholas-results-${date}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
