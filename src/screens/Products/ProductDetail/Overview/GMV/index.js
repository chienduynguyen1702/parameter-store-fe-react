import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import cn from 'classnames';
import styles from './GMV.module.sass';

import { Stack } from 'react-bootstrap';

import Card from '../../../../../components/Card';
import Chart from './Chart';
import {
  handleDataWithGranularity,
  handleObjectArrayToArrayObject,
} from '../../../../../utils/helpers';

const OptionSelect = ({ className, granularity, handleChangeRangeTime }) => {
  return (
    <div className={styles.nav}>
      <Stack direction="horizontal">
        {/* Day  */}
        <button
          className={cn(styles.link, {
            [styles.active]: granularity === 'day',
          })}
          onClick={() => handleChangeRangeTime('day')}
        >
          Day
        </button>
        {/* Week  */}
        <button
          className={cn(styles.link, {
            [styles.active]: granularity === 'week',
          })}
          onClick={() => handleChangeRangeTime('week')}
        >
          Week
        </button>
        {/* Month  */}
        <button
          className={cn(styles.link, {
            [styles.active]: granularity === 'month',
          })}
          onClick={() => handleChangeRangeTime('month')}
        >
          Month
        </button>
        {/* Quarter  */}
        <button
          className={cn(styles.link, {
            [styles.active]: granularity === 'quarter',
          })}
          onClick={() => handleChangeRangeTime('quarter')}
        >
          Quarter
        </button>
        {/* Year  */}
        <button
          className={cn(styles.link, {
            [styles.active]: granularity === 'year',
          })}
          onClick={() => handleChangeRangeTime('year')}
        >
          Year
        </button>
      </Stack>
    </div>
  );
};

const GMV = ({ className, dates, data, addLoadingChart }) => {
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
        'gmv',
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
      title="GVM (Million Dong)"
      classTitle={cn('title-red', styles.cardTitle)}
      classCardHead={styles.cardHead}
      head={
        <OptionSelect
          granularity={granularity}
          handleChangeRangeTime={handleChangeRangeTime}
        />
      }
    >
      <div className={styles.overview}>
        <div className={styles.details}>
          <div className={styles.line}></div>
        </div>
        {addLoadingChart(<Chart data={result} />, 488, true)}
      </div>
    </Card>
  );
};

export default GMV;
