import { memo, useSyncExternalStore, useState, useEffect, useRef } from 'react';
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
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentBoxSize[0].inlineSize;
        const height = entry.contentBoxSize[0].blockSize;
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const windowWidth = useSyncExternalStore(
    (callback) => {
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    },
    () => window.innerWidth,
    () => 1200
  );

  const isMobile = windowWidth < 640;
  const yAxisWidth = isMobile ? 110 : 120;
  const axisFontSize = isMobile ? 9 : 11;
  const tickFontSize = isMobile ? 8 : 10;
  const chartHeight = Math.max(
    isMobile ? 360 : 320,
    chartData.length * (isMobile ? 42 : 34)
  );

  return (
    <>
      <div className="relative border border-border bg-card p-5 shadow-xs sm:p-6">
        <h3 className="mb-6 border-l-2 border-border-strong pl-3 font-mono text-[10px] tracking-widest text-foreground-muted uppercase">
          Viability Index Analysis
        </h3>
        <div
          ref={containerRef}
          style={{ height: `${chartHeight}px` }}
          className="w-full min-w-0"
        >
          {dimensions ? (
            <ResponsiveContainer
              width={dimensions.width}
              height={dimensions.height}
            >
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
                  formatter={(value) => (
                    <span className="font-mono text-[9px] text-foreground">
                      {value}
                    </span>
                  )}
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
                  stroke="var(--color-surface)"
                  strokeWidth={1.5}
                  name="Geometry"
                />
                <Bar
                  dataKey="RockMechanics"
                  stackId="a"
                  fill="var(--color-secondary)"
                  stroke="var(--color-surface)"
                  strokeWidth={1.5}
                  name="Rock"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div
              className="flex items-center justify-center"
              style={{ height: `${chartHeight}px` }}
            />
          )}
        </div>
      </div>
    </>
  );
});

export default ComparisonChart;
