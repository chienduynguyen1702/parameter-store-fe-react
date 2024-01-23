import { useCallback } from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { handleLongNumber } from '../../../utils/helpers';
import ChartTooltip from '../../../components/ChartTooltip/index';
import styles from './MixSingleLineBarChart.module.sass';
import ReactTooltip from 'react-tooltip';

export default function MixSingleLineBarChart({
  data,
  hoverColor,
  name,
  color,
  keyBarData = 'barData',
  keyLineData = 'lineData',
}) {
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
    <div className={`${name} mt-4`}>
      <ResponsiveContainer width="100%" height={488}>
        <ComposedChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 35,
            bottom: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="bucket"
            scale="band"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            padding={{ left: 5, right: 5 }}
          />
          <YAxis
            axisLine={false}
            allowDecimals={false}
            tickFormatter={(value) => handleLongNumber(value, 0)}
            label={{
              value: 'Posts',
              position: 'top',
              offset: 25,
              fontSize: 12,
              fontWeight: '500',
              fill: '#9A9FA5',
              dx: 0,
            }}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
          />
          <YAxis
            axisLine={false}
            tickFormatter={(value) => handleLongNumber(value, 0)}
            label={{
              value: 'Engagements',
              position: 'top',
              offset: 25,
              fontSize: 12,
              fontWeight: '500',
              fill: '#9A9FA5',
              dx: -70,
            }}
            tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
            yAxisId="right"
            orientation="right"
          />
          <Tooltip content={<ChartTooltip />} />
          {/* <Legend iconType="square" /> */}
          <Bar
            dataKey={keyBarData}
            barSize={40}
            fill={color}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <Line
            type="monotone"
            dataKey={keyLineData}
            yAxisId="right"
            stroke="#FF6A55"
            dot={false}
            strokeWidth={3}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div className={styles.legend}>
        <div className={styles.indicator}>
          <div
            className={styles.color}
            style={{ backgroundColor: '#fbeadf' }}
          ></div>
          Posts
        </div>
        <div className={styles.indicator}>
          <div
            id="engagements"
            className={styles.color}
            style={{ backgroundColor: '#FF6A55' }}
          ></div>
          <span
            data-tip={'Total likes, comments, and shares combined'}
            data-place={'bottom'}
          >
            Engagements
          </span>
          <ReactTooltip />
        </div>
      </div>
    </div>
  );
}
