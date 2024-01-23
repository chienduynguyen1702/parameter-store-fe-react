import React from 'react';

import styles from './Chart.module.sass';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import useDarkMode from 'use-dark-mode';
import { handleLongNumber } from '../../../../../../utils/helpers';
import ChartTooltip from '../../../../../../components/ChartTooltip/index';

const Chart = ({ data }) => {
  const darkMode = useDarkMode(false);
  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="none"
            stroke={darkMode.value ? '#272B30' : '#EFEFEF'}
            vertical={false}
          />
          <XAxis
            dataKey="bucket"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            padding={{ left: 10 }}
          />
          <YAxis
            tickFormatter={handleLongNumber}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
          />
          <Tooltip content={<ChartTooltip />} />
          <Line
            type="monotone"
            dataKey="gmv"
            dot={false}
            strokeWidth={3}
            stroke="#2A85FF"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
