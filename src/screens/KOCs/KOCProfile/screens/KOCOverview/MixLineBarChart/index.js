import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { handleLongNumber } from '../../../../../../utils/helpers';
import ChartTooltip from '../../../../../../components/ChartTooltip/index';

export default function MixLineBarChart({ data, height = 400, maxY = null }) {
  return (
    <div className="mt-4">
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
            tickLine={false}
            label={{
              value: '',
              position: 'top',
              offset: 25,
              fontSize: 12,
              fontWeight: '500',
              fill: '#9A9FA5',
              dx: -24,
            }}
            tickFormatter={(value) => handleLongNumber(value, 0)}
            yAxisId="left"
            allowDecimals={false}
            domain={[0, maxY || 'auto']}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            orientation="left"
          />
          <YAxis
            axisLine={false}
            label={{
              value: 'Views',
              position: 'top',
              offset: 25,
              fontSize: 12,
              fontWeight: '500',
              fill: '#9A9FA5',
              dx: -10,
            }}
            tickFormatter={handleLongNumber}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            yAxisId="right"
            orientation="right"
            textAnchor="end"
          />
          <YAxis
            hide={true}
            axisLine={false}
            label={{
              value: 'Views',
              position: 'top',
              offset: 25,
              fontSize: 12,
              fontWeight: '500',
              fill: '#9A9FA5',
            }}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            yAxisId="long"
            orientation="right"
          />
          <Line
            type="monotone"
            dataKey="TikTok"
            yAxisId="left"
            stroke="#8E59FF"
            dot={false}
            strokeWidth={3}
          />
          <Line
            type="monotone"
            yAxisId="right"
            dataKey="Instagram"
            stroke="#83BF6E"
            dot={false}
            strokeWidth={3}
          />
          <Line
            type="monotone"
            yAxisId="right"
            dataKey="Youtube"
            stroke="#FF6A55"
            dot={false}
            strokeWidth={3}
          />
          <Line
            type="monotone"
            yAxisId="right"
            dataKey="Facebook"
            stroke="#659EEA"
            dot={false}
            strokeWidth={3}
          />
          <Line
            type="monotone"
            yAxisId="right"
            dataKey="Other"
            stroke="#FFD88D"
            dot={false}
            strokeWidth={3}
          />
          <Legend iconType="square" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
