import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Overview.module.sass';
import Chart from './Chart';
import Item from './Item';

import useLoggerSummary from '../../../../hooks/useLoggerSummary';
import useQueryString from '../../../../hooks/useQueryString';

import CardDashboardWithGranularity from './CardDashboard';

const TYPE_LOG = ['all', 'success', 'error'];

const nav = [
  {
    title: 'Total API Calls',
    counter: '0',
    icon: 'phone',
    color: '#B1E5FC',
  },
  {
    title: 'Success',
    counter: '0',
    icon: 'check-all',
    color: '#B5E4CA',
  },
  {
    title: 'Error',
    counter: '0',
    icon: 'warning',
    color: '#FFD88D',
  },
];

const statisticsHighlights = {
  rangeTime: {
    startDate: '2021-07-01',
    endDate: '2021-07-31',
  },
  orders: {
    total: 0,
    totalRevenue: 0,
    totalCost: 0,
    totalProfit: 0,
  },
  statisticsViews: {
    total: 0,
    totalRevenue: 0,
    totalCost: 0,
    totalProfit: 0,
  },
};

const Overview = ({ className }) => {
  const [listLoggers, setListLoggers] = useState(nav);
  const { queryString, setQueryString } = useQueryString();
  const [activeIndex, setActiveIndex] = useState();
  const [time, setTime] = useState('day');

  const loggerSummary = useLoggerSummary();

  useEffect(() => {
    if (queryString?.typeLog) {
      setActiveIndex(TYPE_LOG.indexOf(queryString.typeLog));
    } else {
      setActiveIndex(0);
    }
  }, []);

  useEffect(() => {
    if (loggerSummary.isSuccess) {
      const updatedNav = [...nav]; // Create a new array
      updatedNav[0].counter = loggerSummary.listLoggers.totalApiCalls;
      updatedNav[1].counter = loggerSummary.listLoggers.successApiCalls;
      updatedNav[2].counter =
        loggerSummary.listLoggers.totalApiCalls -
        loggerSummary.listLoggers.successApiCalls;
      setListLoggers(updatedNav);
    }
  }, [loggerSummary.isSuccess]);

  useEffect(() => {
    if (activeIndex && activeIndex !== 0) {
      setQueryString({ ...queryString, typeLog: TYPE_LOG[activeIndex] });
    } else {
      const { typeLog, ...otherQueryString } = queryString;
      setQueryString(otherQueryString);
    }
  }, [activeIndex]);

  return (
    <CardDashboardWithGranularity
      title="Overview"
      classTitle="title-purple"
      setTime={setTime}
    >
      <div className={styles.overview}>
        <div className={styles.nav}>
          {listLoggers.map((x, index) => (
            <Item
              className={cn(styles.item, {
                [styles.active]: index === activeIndex,
              })}
              key={index}
              onActive={() => setActiveIndex(index)}
              item={x}
            />
          ))}
        </div>
        <div className={styles.body}>
          <Chart granularity={time} />
        </div>
      </div>
    </CardDashboardWithGranularity>
  );
};

export default Overview;
