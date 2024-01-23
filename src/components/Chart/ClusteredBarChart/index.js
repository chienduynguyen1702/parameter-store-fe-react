import React from 'react';

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
          <YAxis
            axisLine={false}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            allowDecimals={yAxisDecimals}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend iconType="square" />
          {data.length !== 0 &&
            Object.keys(data[0])
              .filter((key) => key !== 'bucket')
              .map((value, index) => {
                return (
                  <Bar dataKey={value} fill={colors[index % colors?.length]} />
                );
              })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
