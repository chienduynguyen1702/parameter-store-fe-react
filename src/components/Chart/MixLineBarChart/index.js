import { useCallback } from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import cn from 'classnames';

import { handleLongNumber } from '../../../utils/helpers';
import ChartTooltip from '../../../components/ChartTooltip/index';

export default function MixLineBarChart({
  data,
  hoverColor,
  name,
  color,
  className,
  height = 400,
  KOCsMax = null,
}) {
  const handleMouseEnter = useCallback(() => {
    if (hoverColor) {
      let cells = document.querySelectorAll(
        `.${name} .recharts-bar-rectangle path`,
      );
      cells.forEach((cell) => {
        cell.addEventListener('mouseenter', () => {
          cell.style.fill = hoverColor;
        });
      });
    }
  }, [hoverColor, name]);

  const handleMouseLeave = useCallback(() => {
    if (hoverColor) {
      let cells = document.querySelectorAll(
        `.${name} .recharts-bar-rectangle path`,
      );
      cells.forEach((cell) => {
        cell.addEventListener('mouseleave', () => {
          cell.style.fill = color;
        });
      });
    }
  }, [color, hoverColor, name]);

  return (
    <div className={cn(className, name)}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 35,
            bottom: 20,
          }}
        >
          <CartesianGrid vertical={false} stroke="#f5f5f5" />
          <XAxis
            dataKey="bucket"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            padding={{ left: 5, right: 5 }}
          />
          <Tooltip content={<ChartTooltip />} />
          <YAxis
            axisLine={false}
            label={{
              value: 'KOCs',
              position: 'top',
              offset: 25,
              fontSize: 12,
              fontWeight: '500',
              fill: '#9A9FA5',
              dx: 0,
            }}
            tickFormatter={(value) => handleLongNumber(value, 0)}
            yAxisId="left"
            allowDecimals={false}
            domain={[0, KOCsMax || 'auto']}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            orientation="left"
          />
          {/* <YAxis
            hide={true}
            axisLine={false}
            label={{
              value: 'Orders',
              position: 'top',
              offset: 25,
              fontSize: 12,
              fontWeight: '500',
              fill: '#9A9FA5',
              dx: -20,
            }}
            tickFormatter={(value) => handleLongNumber(value, 0)}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            yAxisId="right"
            orientation="right"
            textAnchor="end"
          /> */}
          <YAxis
            axisLine={false}
            label={{
              value: 'Views',
              position: 'top',
              offset: 25,
              fontSize: 12,
              fontWeight: '500',
              fill: '#9A9FA5',
              dx: -20,
            }}
            tickFormatter={(value) => handleLongNumber(value, 0)}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            yAxisId="long"
            orientation="right"
          />

          <Legend
            payload={[
              { id: '1', value: 'Views', type: 'square', color: '#FFBC99' },
              { id: '2', value: 'KOCs', type: 'square', color: '#659EEA' },
              // { id: '3', value: 'Orders', type: 'square', color: '#FF6A55' },
            ]}
          />
          <Bar
            dataKey="Views"
            barSize={40}
            fill={color}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            yAxisId="long"
          />
          <Line
            type="monotone"
            dataKey="KOCs"
            yAxisId="left"
            stroke="#659EEA"
            dot={false}
            strokeWidth={3}
          />
          <Line
            // type="monotone"
            // yAxisId="right"
            yAxisId="left"
            dataKey="Orders"
            stroke="#FF6A55"
            dot={false}
            strokeWidth={3}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
