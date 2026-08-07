import { memo, useState, useEffect, useRef } from 'react';
import { type ChartDataRow } from '@/types';
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
import { motion } from 'motion/react';
interface ComparisonBarChartProps {
  chartData: ChartDataRow[];
}

const ComparisonBarChart = memo(function ComparisonBarChart({
  chartData,
}: ComparisonBarChartProps) {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 639px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const yAxisWidth = isMobile ? 120 : 130;
  const axisFontSize = isMobile ? 10 : 13;
  const tickFontSize = isMobile ? 8 : 10;
  const chartHeight = Math.max(
    isMobile ? 360 : 320,
    chartData.length * (isMobile ? 42 : 34)
  );

  return (
    <>
      <motion.h3
        className="font-boldonse text-[10px] tracking-widest uppercase"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        03 / Viability Index Analysis
      </motion.h3>
      <motion.div
        className="relative w-full py-5 sm:py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div
          ref={containerRef}
          style={{ height: `${chartHeight}px` }}
          className="w-full"
        >
          <ResponsiveContainer width="95%" height="100%">
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
              <CartesianGrid horizontal={false} vertical={false} />
              <XAxis
                type="number"
                tick={{
                  fontSize: tickFontSize,
                  fill: 'var(--color-text-primary)',
                  fontFamily: 'prompt',
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
                  fill: 'var(--color-text-primary)',
                  fontFamily: 'prompt',
                }}
                axisLine={{ stroke: 'var(--color-border)' }}
                tickLine={false}
                interval={0}
              />
              <Tooltip
                cursor={{ fill: 'var(--color-background)' }}
                contentStyle={{
                  fontSize: '13px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '7px',
                }}
              />
              <Legend
                verticalAlign="top"
                align={isMobile ? 'center' : 'right'}
                layout="horizontal"
                iconType="square"
                iconSize={8}
                formatter={(value) => <span className="text-md">{value}</span>}
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
                strokeWidth={1}
                name="Geometry"
              />
              <Bar
                dataKey="RockMechanics"
                stackId="a"
                fill="var(--color-secondary)"
                strokeWidth={1}
                name="Rock"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </>
  );
});

export default ComparisonBarChart;
