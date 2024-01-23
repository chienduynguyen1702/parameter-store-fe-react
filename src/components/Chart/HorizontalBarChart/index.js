import React from 'react';
import { useCallback } from 'react';
import cn from 'classnames';
import styles from './HorizontalBarChart.module.sass';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { handleLongNumber } from '../../../utils/helpers';
import ChartTooltip from '../../../components/ChartTooltip/index';
import { NoData } from '../../../components';

export default function HorizontalBarChart({
  data,
  count,
  color,
  field,
  name,
  hoverColor,
}) {
  data = data?.map((value) => {
    return {
      name: value.name,
      value: Number(value[Object.keys(value)[1]]),
    };
  });
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
      {count && <div className="fs-2 mb-3">{count}</div>}
      {data.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            height: '300px',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <NoData />
        </div>
      )}
      {data.length !== 0 && (
        <div className="d-flex">
          <div
            className={cn('fs-7 text-light-gray pe-2', styles.titleBox)}
            style={{ lineHeight: `${370 / data?.length}px` }}
          >
            {data?.map((_, index) => {
              return <div className={styles.title}>{data[index]['name']}</div>;
            })}
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              width={600}
              height={300}
              barSize={19}
              data={data}
              layout="vertical"
              margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
            >
              <CartesianGrid horizontal={false} stroke={'#EFEFEF'} />
              <XAxis
                tickFormatter={handleLongNumber}
                domain={[0, 5]}
                axisLine={false}
                dataKey="value"
                tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
                stroke={'#EFEFEF'}
                type="number"
              />
              <YAxis
                // mirror={true}
                domain={[0, 5]}
                hide={true}
                dataKey="name"
                axisLine={false}
                tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
                stroke={'#EFEFEF'}
                type="category"
                tickLine={false}
                interval={'preserveStart'}
              />
              <Tooltip content={<ChartTooltip />} />
              <Bar
                style={{ maxHeight: '100px' }}
                // width={100}
                // barSize={100}
                // maxBarSize={100}
                dataKey="value"
                fill={color}
                margin={{ left: 100 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
