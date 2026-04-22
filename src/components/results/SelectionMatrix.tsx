import { useState, useEffect } from 'react';
import { type ScoredMethod,type ChartDataRow } from '../../types';
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
}: SelectionMatrixProps) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const yAxisWidth = isMobile ? 80 : 120;
  const axisFontSize = isMobile ? 9 : 11;
  const tickFontSize = isMobile ? 8 : 10;
  const chartHeight = Math.max(
    isMobile ? 450 : 350,
    chartData.length * (isMobile ? 45 : 35)
  );

  return (
    <>
      <h2 className="text-foreground-muted mt-12 mb-6 text-sm font-bold tracking-widest uppercase">
        03 / Selection Matrix
      </h2>

      <div style={{ height: `${chartHeight}px` }} className="mb-8 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 20, left: isMobile ? 0 : 20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              stroke="var(--color-border)"
            />
            <XAxis
              type="number"
              tick={{
                fontSize: tickFontSize,
                fill: 'var(--color-foreground-muted)',
                fontFamily: 'monospace',
              }}
              axisLine={{ stroke: 'var(--color-border)' }}
              tickLine={false}
              minTickGap={10}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={yAxisWidth}
              tick={{
                fontSize: axisFontSize,
                fill: 'var(--color-foreground)',
                fontFamily: 'serif',
                fontStyle: 'italic',
              }}
              axisLine={{ stroke: 'var(--color-border)' }}
              tickLine={false}
              interval={0}
            />
            <Tooltip
              cursor={{ fill: 'var(--color-surface-muted)' }}
              contentStyle={{
                borderRadius: '0',
                border: '1px solid var(--color-primary)',
                backgroundColor: 'var(--color-tooltip)',
                color: 'var(--color-tooltip-foreground)',
                fontSize: '10px',
              }}
            />
            <Legend
              verticalAlign="top"
              align={isMobile ? 'center' : 'right'}
              layout="horizontal"
              iconType="square"
              iconSize={8}
              wrapperStyle={{
                paddingBottom: '20px',
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-foreground-muted)',
              }}
            />
            <Bar
              dataKey="Geometry"
              stackId="a"
              fill="var(--color-primary)"
              name="Geometry"
            />
            <Bar
              dataKey="RockMechanics"
              stackId="a"
              fill="var(--color-secondary)"
              name="Rock"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
