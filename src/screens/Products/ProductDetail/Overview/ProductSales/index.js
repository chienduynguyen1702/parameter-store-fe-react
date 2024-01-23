import React, { useCallback, useEffect, useState } from 'react';

import styles from './ProductSales.module.sass';
import cn from 'classnames';

import Card from '../../../../../components/Card';
import {
  BarChart,
  Bar,
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

const ProductSales = ({ className, dates, data, addLoadingChart }) => {
  const darkMode = useDarkMode(false);
  const [result, setResult] = useState([]);
  const [granularity, setGranularity] = useState('day');

  const handleChangeRangeTime = useCallback(
    (granularity) => {
      setGranularity(granularity);
      let bucket = handleDataWithGranularity(granularity, dates);
      const handleData = handleDataWithGranularity(
        granularity,
        dates,
        data,
        'sold',
      );
      const result = handleObjectArrayToArrayObject({
        bucket,
        handleData,
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
      title="Product sold"
      classTitle={cn('title-purple', styles.title)}
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
            <BarChart
              width={500}
              height={400}
              data={result}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
              barSize={40}
              barGap={8}
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
                tick={{ fontSize: 12, fontWeight: '500', fill: '#6F767E' }}
                padding={{ left: 10 }}
              />
              <YAxis
                tickFormatter={(value) => handleLongNumber(value, 0)}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                tick={{ fontSize: 12, fontWeight: '500', fill: '#6F767E' }}
              />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="sold" fill="#B5E4CA" />
            </BarChart>,
            488,
            true,
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ProductSales;
