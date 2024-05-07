import React from 'react';

import {
  handleLongNumber,
  handleLongNumberToDuration,
} from '../../../utils/helpers';
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
import ChartTooltip from '../../../components/ChartTooltip/index';

export default function ClusteredBarChart({
  data,
  colors,
  count,
  height = 400,
  yAxisDecimals = false,
}) {
  const yAxisIds = ['0', '1'];
  return (
    <div className="mt-4">
      {count && <div className="fs-2 mb-3">{count}</div>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          barSize={20}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} stroke="#f5f5f5" />
          <XAxis
            dataKey="bucket"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            padding={{ left: 5, right: 10 }}
          />
          <Tooltip content={<ChartTooltip />} />
          <YAxis
            axisLine={false}
            label={{
              value: 'AVG Duration time',
              position: 'top',
              offset: 25,
              fontSize: 12,
              fontWeight: '500',
              fill: '#9A9FA5',
              dx: 0,
            }}
            tickFormatter={(value) => handleLongNumberToDuration(value, 0)}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            yAxisId={yAxisIds[0]}
            orientation="left"
          />
          <YAxis
            axisLine={false}
            label={{
              value: 'Updated Count',
              position: 'top',
              offset: 25,
              fontSize: 12,
              fontWeight: '500',
              fill: '#9A9FA5',
              dx: -20,
            }}
            tickFormatter={(value) => handleLongNumber(value, 0)}
            yAxisId={yAxisIds[1]}
            allowDecimals={false}
            // domain={[0, KOCsMax || 'auto']}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            orientation="right"
          />
          {data?.length !== 0 &&
            Object.keys(data[0])
              .filter((key) => key !== 'bucket')
              .map((value, index) => {
                return (
                  <Bar
                    dataKey={value}
                    fill={colors[index % colors?.length]}
                    yAxisId={yAxisIds[index]}
                  />
                );
              })}
          <Legend
            iconType="square"
            payload={[
              {
                id: '1',
                value: 'Average Duration time (minutes)',
                type: 'square',
                color: '#659EEA',
              },
              {
                id: '2',
                value: 'Updated Count',
                type: 'square',
                color: '#FFBC99',
              },
            ]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
