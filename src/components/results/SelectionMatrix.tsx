import { type ScoredMethod, type ChartDataRow } from '../../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface SelectionMatrixProps {
  chartData: ChartDataRow[];
  results: ScoredMethod[];
}

export default function SelectionMatrix({
  chartData,
  results,
}: SelectionMatrixProps) {
  return (
    <>
      <h2 className="mt-12 mb-6 text-sm font-bold tracking-widest text-[#aaa] uppercase">
        03 / Selection Matrix
      </h2>

      <div className="mb-8 h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 0, left: 10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              stroke="#333"
            />
            <XAxis
              type="number"
              tick={{ fontSize: 10, fill: '#A3A3A3', fontFamily: 'monospace' }}
              axisLine={{ stroke: '#333' }}
              tickLine={false}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={100}
              tick={{
                fontSize: 12,
                fill: '#E5E5E5',
                fontFamily: 'serif',
                fontStyle: 'italic',
              }}
              axisLine={{ stroke: '#333' }}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: '#222' }}
              contentStyle={{
                borderRadius: '0',
                border: '1px solid #D4AF37',
                backgroundColor: '#1a1a1a',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '5px',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#A3A3A3',
              }}
            />
            <Bar
              dataKey="Geometry"
              stackId="a"
              fill="#D4AF37"
              name="Geometry (Gold)"
            />
            <Bar
              dataKey="RockMechanics"
              stackId="a"
              fill="#B87333"
              name="Rock (Copper)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto border-t border-[#333]">
        <table className="w-full text-left text-sm text-[#E5E5E5]">
          <thead className="border-b border-[#333] font-mono text-[10px] tracking-widest text-[#A3A3A3] uppercase">
            <tr>
              <th className="px-4 py-4 font-normal">Rank</th>
              <th className="px-4 py-4 font-normal">Method</th>
              <th className="px-4 py-4 text-right font-normal">Geo</th>
              <th className="px-4 py-4 text-right font-normal">Rock</th>
              <th className="px-4 py-4 text-right font-normal text-[#D4AF37]">
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
                  className={`border-b border-[#222] last:border-0 ${eliminated ? 'opacity-30' : 'hover:bg-[#1a1a1a]'} transition-colors`}
                >
                  <td
                    className={`px-4 py-4 font-mono text-[10px] ${isFirst ? 'text-[#D4AF37]' : 'text-[#A3A3A3]'}`}
                  >
                    {!eliminated ? `0${idx + 1}`.slice(-2) : '-'}
                  </td>
                  <td
                    className={`px-4 py-4 font-serif italic ${eliminated ? 'text-[#888] line-through' : isFirst ? 'font-bold text-[#D4AF37]' : 'text-white'}`}
                  >
                    {result.method}
                  </td>
                  <td className="px-4 py-4 text-right font-mono text-xs">
                    {result.geometryScore}
                  </td>
                  <td className="px-4 py-4 text-right font-mono text-xs text-[#B87333]">
                    {result.rockTotal}
                  </td>
                  <td
                    className={`px-4 py-4 text-right font-mono text-xs ${isFirst ? 'font-bold text-[#D4AF37]' : 'text-white'}`}
                  >
                    {result.total}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
