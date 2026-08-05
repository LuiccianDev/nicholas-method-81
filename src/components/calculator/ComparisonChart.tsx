import { memo, useState, useEffect, useRef } from 'react';
import { type ChartDataRow } from '../../types';
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

interface ComparisonChartProps {
  chartData: ChartDataRow[];
}

const ComparisonChart = memo(function ComparisonChart({
  chartData,
}: ComparisonChartProps) {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 639px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const yAxisWidth = isMobile ? 110 : 120;
  const axisFontSize = isMobile ? 9 : 11;
  const tickFontSize = isMobile ? 8 : 10;
  const chartHeight = Math.max(
    isMobile ? 360 : 320,
    chartData.length * (isMobile ? 42 : 34)
  );

  return (
    <>
      <h3 className="text-xs font-bold tracking-widest uppercase">
        03 / Viability Index Analysis
      </h3>
      <div className="relative w-full border border-t-2 border-border border-t-primary bg-card p-5 sm:p-6">
        <div
          ref={containerRef}
          style={{ height: `${chartHeight}px` }}
          className="w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                top: 0,
                right: 40,
                left: isMobile ? 0 : 20,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
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
                }}
                axisLine={{ stroke: 'var(--color-border)' }}
                tickLine={false}
                interval={0}
              />
              <Tooltip
                cursor={{ fill: 'var(--color-surface-muted)' }}
                contentStyle={{
                  borderRadius: '0',
                  fontSize: '10px',
                }}
              />
              <Legend
                verticalAlign="top"
                align={isMobile ? 'center' : 'right'}
                layout="horizontal"
                iconType="square"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-xxxs">{value}</span>
                )}
                wrapperStyle={{
                  paddingBottom: '20px',
                  fontSize: '9px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              />
              <Bar
                dataKey="Geometry"
                stackId="a"
                fill="var(--color-primary)"
                strokeWidth={1.5}
                name="Geometry"
              />
              <Bar
                dataKey="RockMechanics"
                stackId="a"
                fill="var(--color-secondary)"
                strokeWidth={1.5}
                name="Rock"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
});

export default ComparisonChart;
