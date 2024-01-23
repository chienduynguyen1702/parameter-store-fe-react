import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { handleLongNumber } from '../../../utils/helpers';
import ChartTooltip from '../../../components/ChartTooltip/index';

import styles from './SingleLineChart.module.sass';

const SingleLineChart = ({
  data,
  fieldX = 'bucket',
  fieldY = 'delta',
  count,
  color,
  yAxisDecimals = false,
}) => {
  return (
    <div>
      {count && <div className="fs-2 mt-4">{count}</div>}
      <div className="mt-4">
        <div className={styles.chartBox}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={300}
              height={100}
              data={data}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid vertical={false} stroke="#EFEFEF" />
              <XAxis
                padding={{ left: 5, right: 10 }}
                dataKey={fieldX}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
              />
              <YAxis
                tickFormatter={(value) => handleLongNumber(value, 0)}
                tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
                axisLine={false}
                allowDecimals={yAxisDecimals}
              />
              <Tooltip content={<ChartTooltip />} />
              <Line
                type="monotone"
                dataKey={fieldY}
                stroke={color}
                dot={false}
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SingleLineChart;
