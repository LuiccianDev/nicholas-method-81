
import {type ScoredMethod } from '../../types';

interface ResultsTableProps {
  results: ScoredMethod[];
}

export default function ResultsTable({ results }: ResultsTableProps) {
  return (
    <div className="border-border overflow-x-auto border">
      <table className="text-foreground w-full text-left text-sm">
        <thead className="border-border bg-surface-muted text-foreground-muted sticky top-0 border-b font-mono text-[10px] tracking-widest uppercase md:relative">
          <tr>
            <th className="px-4 py-4 font-normal">Rank</th>
            <th className="px-4 py-4 font-normal">Method</th>
            <th className="px-4 py-4 text-right font-normal">Geo</th>
            <th className="px-4 py-4 text-right font-normal">Rock</th>
            <th className="text-primary px-4 py-4 text-right font-normal">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, idx) => {
            const eliminated =
              (result.total !== undefined && result.total < 0) ||
              result.isEliminated;
            const isFirst = idx === 0 && !eliminated;
            return (
              <tr
                key={result.method}
                className={`border-border-strong last:border-0 ${eliminated ? 'opacity-30' : 'hover:bg-surface-muted'} border-b transition-colors`}
              >
                <td
                  className={`px-4 py-4 font-mono text-[10px] ${isFirst ? 'text-primary' : 'text-foreground-muted'}`}
                >
                  {!eliminated ? `0${idx + 1}`.slice(-2) : '-'}
                </td>
                <td
                  className={`px-4 py-4 font-serif italic ${eliminated ? 'text-zinc-500 line-through' : isFirst ? 'font-bold text-primary' : 'text-foreground'}`}
                >
                  {result.method}
                </td>
                <td className="px-4 py-4 text-right font-mono text-xs">
                  {result.geometryScore}
                </td>
                <td className="text-secondary px-4 py-4 text-right font-mono text-xs">
                  {result.rockTotal}
                </td>
                <td
                  className={`px-4 py-4 text-right font-mono text-xs ${isFirst ? 'font-bold text-primary' : 'text-foreground'}`}
                >
                  {result.total}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
