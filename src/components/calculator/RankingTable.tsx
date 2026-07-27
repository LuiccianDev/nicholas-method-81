import { cn } from '../../lib/utils';
import { type ScoredMethod } from '../../types';

interface RankingTableProps {
  results: ScoredMethod[];
}

export default function RankingTable({ results }: RankingTableProps) {
  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full text-left text-sm text-foreground">
        <thead className="sticky top-0 border-b border-border bg-surface-muted font-mono text-xxs tracking-widest text-foreground-muted uppercase md:relative">
          <tr>
            <th className="px-4 py-4 font-normal">Rank</th>
            <th className="px-4 py-4 font-normal">Method</th>
            <th className="px-4 py-4 text-right font-normal">Geo</th>
            <th className="px-4 py-4 text-right font-normal">Rock</th>
            <th className="px-4 py-4 text-right font-normal text-primary">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, idx) => {
            const eliminated = result.isEliminated;
            const isFirst = idx === 0 && !eliminated;
            return (
              <tr
                key={result.method}
                className={cn(
                  'border-b border-border-strong transition-colors last:border-0',
                  eliminated && 'opacity-30',
                  !eliminated && 'hover:bg-surface-muted'
                )}
              >
                <td
                  className={cn(
                    'px-4 py-4 font-mono text-xxs',
                    isFirst ? 'text-primary' : 'text-foreground-muted'
                  )}
                >
                  {!eliminated ? `0${idx + 1}`.slice(-2) : '-'}
                </td>
                <td
                  className={cn(
                    'px-4 py-4 font-serif italic',
                    eliminated && 'text-zinc-500 line-through',
                    !eliminated &&
                      (isFirst ? 'font-bold text-primary' : 'text-foreground')
                  )}
                >
                  {result.method}
                </td>
                <td className="px-4 py-4 text-right font-mono text-xs">
                  {result.geometryScore}
                </td>
                <td className="px-4 py-4 text-right font-mono text-xs text-secondary">
                  {result.rockTotal}
                </td>
                <td
                  className={cn(
                    'px-4 py-4 text-right font-mono text-xs',
                    isFirst ? 'font-bold text-primary' : 'text-foreground'
                  )}
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
