import { cn } from '@/lib/cn';
import { type ScoredMethod } from '@/types';

interface RankingTableProps {
  results: ScoredMethod[];
}

export default function RankingTable({ results }: RankingTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-background">
      <table className="w-full rounded-2xl text-left text-sm">
        <thead className="sticky top-0 border-b border-border text-[12px] tracking-widest uppercase md:relative">
          <tr>
            <th className="px-4 py-4">Rank</th>
            <th className="px-4 py-4">Method</th>
            <th className="px-4 py-4 text-right">Geo</th>
            <th className="px-4 py-4 text-right">Rock</th>
            <th className="px-4 py-4 text-right">Total</th>
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
                  'transition-colors',
                  eliminated && 'opacity-60',
                  !eliminated && ''
                )}
              >
                <td className="px-4 py-4 text-[10px]">
                  {!eliminated ? `0${idx + 1}`.slice(-2) : '-'}
                </td>
                <td
                  className={cn(
                    'px-4 py-4',
                    eliminated && 'text-zinc-500 line-through',
                    !eliminated && (isFirst ? 'font-bold text-primary' : '')
                  )}
                >
                  {result.method}
                </td>
                <td className="px-4 py-4 text-right text-[13px]">
                  {result.geometryScore}
                </td>
                <td className="px-4 py-4 text-right text-[13px] font-bold text-quaternary">
                  {result.rockTotal}
                </td>
                <td
                  className={cn(
                    'px-4 py-4 text-right text-[13px]',
                    isFirst ? 'font-bold text-primary' : ''
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
