import React from 'react';
import { useCallback } from 'react';

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
import { handleLongNumber } from '../../../utils/helpers';
import ChartTooltip from '../../../components/ChartTooltip/index';

export default function SingleBarChart({
  data,
  count,
  color,
  fieldX = 'bucket',
  fieldY = 'delta',
  name,
  hoverColor,
  legend,
  height = 400,
  yAxisDecimals = false,
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
    <div className={`mt-4 ${name}`}>
      {count && (
        <div className="fs-2 mb-3">
          {parseInt(count).toLocaleString('en-US')} Contents
        </div>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          barSize={52}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} stroke="#f5f5f5" />
          <XAxis
            dataKey={fieldX}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            padding={{ left: 5, right: 10 }}
          />
          <YAxis
            tickFormatter={(value) => handleLongNumber(value, 0)}
            axisLine={false}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            allowDecimals={yAxisDecimals}
          />
          <Tooltip content={<ChartTooltip />} />
          {legend && <Legend iconType="square" />}
          <Bar
            dataKey={fieldY}
            fill={color}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
