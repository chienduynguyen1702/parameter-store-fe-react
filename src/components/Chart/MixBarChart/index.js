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
import { handleLongNumber } from '../../../utils/helpers';
import ChartTooltip from '../../../components/ChartTooltip/index';

export default function MixBarChart({
  data,
  count,
  name,
  height = 400,
  yAxisDecimals = false,
  colors,
}) {
  return (
    <div className={`mt-4 ${name}`}>
      {count && <div className="fs-2 mb-3">{count}</div>}
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
          <CartesianGrid vertical={false} stroke={'#EFEFEF'} />
          <XAxis
            dataKey="bucket"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            padding={{ left: 5, right: 10 }}
          />
          <YAxis
            tickFormatter={(value) => handleLongNumber(value, 0)}
            // mirror={true}
            axisLine={false}
            // tickLine={false}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            allowDecimals={yAxisDecimals}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend iconType="square" margin={{ right: 20 }} />
          {data?.[0] &&
            Object.keys?.(data?.[0])
              .filter?.((key) => key !== 'bucket')
              .map?.((value, index) => {
                return (
                  <Bar
                    dataKey={value}
                    fill={colors[index % colors.length]}
                    stackId="chart"
                    //   onMouseEnter={handleMouseEnter}
                    //   onMouseLeave={handleMouseLeave}
                  />
                );
              })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
