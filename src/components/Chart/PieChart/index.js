import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import ChartTooltip from '../../../components/ChartTooltip/index';

import { NoData } from '../../../components';

import styles from './PieChart.module.sass';

export default function CustomPieChart({
  data,
  colors,
  height = 400,
  innerRadius = 60,
  outerRadius = 80,
}) {
  return (
    <div className="d-flex flex-column align-items-center">
      {data.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            height: '400px',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <NoData />
        </div>
      )}
      {data.length !== 0 && (
        <PieChart width={500} height={height} margin={{ left: 0, right: 0 }}>
          <Legend
            wrapperStyle={{ fontSize: '12px', fontWeight: '700' }}
            iconType={'square'}
          />
          <Tooltip content={<ChartTooltip />} />
          <Pie
            data={data?.map((item) => ({ ...item, delta: Number(item.delta) }))}
            dataKey="delta"
            nameKey="bucket"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill="#8884d8"
          >
            {data?.map((value, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                label={value.bucket}
                className={styles.cell}
              />
            ))}
          </Pie>
        </PieChart>
      )}
    </div>
  );
}
