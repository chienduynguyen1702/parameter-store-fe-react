import React, { useCallback, useEffect, useState } from 'react';

import cn from 'classnames';
import styles from './ActiveCustomers.module.sass';

import Card from '../../../../../components/Card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import useDarkMode from 'use-dark-mode';

import { Stack } from 'react-bootstrap';

import {
  handleDataWithGranularity,
  handleObjectArrayToArrayObject,
} from '../../../../../utils/helpers';
import { handleLongNumber } from '../../../../../utils/helpers';
import ChartTooltip from '../../../../../components/ChartTooltip/index';

const legend = [
  {
    title: 'Tiktok',
    color: '#8E59FF',
  },
  {
    title: 'Instagram',
    color: '#83BF6E',
  },
  {
    title: 'Youtube',
    color: '#FF6A55',
  },
  {
    title: 'Facebook',
    color: '#659EEA',
  },
];

const OptionSelect = ({ className, viewOption, setViewOption }) => {
  return (
    <div className={styles.nav}>
      <Stack direction="horizontal">
        {/* Day  */}
        <button
          className={cn(styles.link, {
            [styles.active]: viewOption === 'day',
          })}
          onClick={() => setViewOption('day')}
        >
          Day
        </button>
        {/* Week  */}
        <button
          className={cn(styles.link, {
            [styles.active]: viewOption === 'week',
          })}
          onClick={() => setViewOption('week')}
        >
          Week
        </button>
        {/* Month  */}
        <button
          className={cn(styles.link, {
            [styles.active]: viewOption === 'month',
          })}
          onClick={() => setViewOption('month')}
        >
          Month
        </button>
        {/* Quarter  */}
        <button
          className={cn(styles.link, {
            [styles.active]: viewOption === 'quarter',
          })}
          onClick={() => setViewOption('quarter')}
        >
          Quarter
        </button>
        {/* Year  */}
        <button
          className={cn(styles.link, {
            [styles.active]: viewOption === 'year',
          })}
          onClick={() => setViewOption('year')}
        >
          Year
        </button>
      </Stack>
    </div>
  );
};

const ActiveCustomers = ({ className, dates, data, addLoadingChart }) => {
  const darkMode = useDarkMode(false);
  const [result, setResult] = useState([]);
  const [granularity, setGranularity] = useState('day');

  const handleChangeRangeTime = useCallback(
    (granularity) => {
      setGranularity(granularity);
      let bucket = handleDataWithGranularity(granularity, dates);
      const handleData = data?.map((item) => {
        let bucket = handleDataWithGranularity(
          granularity,
          dates,
          item?.delta,
          item?.name,
        );
        return bucket;
      });
      const result = handleObjectArrayToArrayObject({
        bucket,
        ...handleData,
      });

      setResult(result);
    },
    [data, dates],
  );

  useEffect(() => {
    if (data && dates) {
      handleChangeRangeTime('day');
    }
  }, [data, dates, handleChangeRangeTime]);

  return (
    <Card
      className={cn(styles.card, className)}
      title="View (Million)"
      classTitle={cn('title-purple', styles.cardTitle)}
      classCardHead={styles.cardHead}
      head={
        <OptionSelect
          viewOption={granularity}
          setViewOption={handleChangeRangeTime}
        />
      }
    >
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          {addLoadingChart(
            <LineChart
              width={500}
              height={400}
              data={result}
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
                dataKey="bucket"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
                padding={{ left: 10 }}
              />
              <YAxis
                tickFormatter={(data) => handleLongNumber(data, 0)}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                tick={{ fontSize: 12, fontWeight: '500', fill: '#9A9FA5' }}
              />
              <Tooltip content={<ChartTooltip />} />
              <Line
                type="monotone"
                dataKey="tiktok"
                dot={false}
                strokeWidth={3}
                stroke="#8E59FF"
              />
              <Line
                type="monotone"
                dataKey="instagram"
                dot={false}
                strokeWidth={3}
                stroke="#83BF6E"
              />
              <Line
                type="monotone"
                dataKey="youtube"
                dot={false}
                strokeWidth={3}
                stroke="#FF6A55"
              />
              <Line
                type="monotone"
                dataKey="facebook"
                dot={false}
                strokeWidth={3}
                stroke="#659EEA"
              />
            </LineChart>,
            488,
            true,
          )}
        </ResponsiveContainer>
      </div>
      <div className={styles.legend}>
        {legend.map((x, index) => (
          <div className={styles.indicator} key={index}>
            <div
              className={styles.color}
              style={{ backgroundColor: x.color }}
            ></div>
            {x.title}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ActiveCustomers;
