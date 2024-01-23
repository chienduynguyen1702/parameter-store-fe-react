import React from 'react';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Legend,
} from 'recharts';
import { handleLongNumber } from '../../../utils/helpers';
import ChartTooltip from '../../../components/ChartTooltip/index';

import styles from './ClusteredLineChart.module.sass';

const ClusteredLineChart = ({ data, count, colors, fields }) => {
  return (
    <div>
      {count && <div className="fs-1 mt-4">{count}</div>}
      <div className="mt-4">
        <div className={styles.chartBox}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart width={'100%'} height={488} data={data}>
              <CartesianGrid vertical={false} stroke={'#EFEFEF'} />
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
                tickFormatter={(value) => handleLongNumber(value, 0)}
                yAxisId="left"
                allowDecimals={false}
                tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
                orientation="left"
              />
              {fields?.map((value, index) => (
                <>
                  <Line
                    type="monotone"
                    dataKey={value}
                    stroke={colors[index]}
                    dot={false}
                    strokeWidth={3}
                    yAxisId="left"
                  />
                </>
              ))}
              <Legend iconType="square" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ClusteredLineChart;
