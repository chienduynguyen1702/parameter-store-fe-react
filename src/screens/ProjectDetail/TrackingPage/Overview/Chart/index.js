import React, { useState, useEffect } from 'react';
import styles from './Chart.module.sass';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import useDarkMode from 'use-dark-mode';
import useAmountLoggerByDay from '../../../../../hooks/useAmountLoggerByDay';
import { handleDataWithGranularity } from '../../../../../utils/helpers';

const data = [
  {
    date: 'Apr',
    total: 500,
    success: 100,
    error: 100,
  },
  {
    date: 'May',
    total: 200,
    success: 100,
    error: 100,
  },
];

const Chart = ({ granularity }) => {
  const darkMode = useDarkMode(false);
  const [dataChart, setDataChart] = useState(data);
  const { listLoggers } = useAmountLoggerByDay();

  useEffect(() => {
    if (granularity === 'day') {
      setDataChart(listLoggers);
      return;
    } else if (granularity === 'week') {
      setDataChart(handleDataWithGranularity(listLoggers, 'week'));
      return;
    } else if (granularity === 'month') {
      setDataChart(handleDataWithGranularity(listLoggers, 'month'));
      return;
    } else if (granularity === 'year') {
      setDataChart(handleDataWithGranularity(listLoggers, 'year'));
      return;
    }
  }, [listLoggers, granularity]);

  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={300}
          data={dataChart}
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
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            padding={{ left: 10 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#272B30',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              borderRadius: 8,
              boxShadow:
                '0px 4px 8px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1), inset 0px 0px 1px #000000',
            }}
            labelStyle={{ fontSize: 12, fontWeight: '500', color: '#fff' }}
            itemStyle={{
              padding: 0,
              textTransform: 'capitalize',
              fontSize: 12,
              fontWeight: '600',
              color: '#fff',
            }}
          />
          <Bar dataKey="success" barSize={20} fill="#83BF6E" />
          <Bar dataKey="error" barSize={20} fill="#FF6A55" />
          <Line
            type="monotone"
            dataKey="total"
            dot={false}
            strokeWidth={4}
            stroke="#2A85FF"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
