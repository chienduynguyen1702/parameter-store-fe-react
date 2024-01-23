import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './Overview.module.sass';

import SummaryCard from './SummaryCard';

const Overview = ({ ordersSummary }) => {
  const items = useMemo(() => {
    return [
      {
        title: 'Total Orders',
        counter: ordersSummary?.totalOrders,
        icon: 'order-purple',
        color: '#CABDFF',
        tooltip: 'Total number of confirmed orders',
      },
      {
        title: 'Total Revenue',
        counter: ordersSummary?.totalRevenue,
        icon: 'bag-green',
        color: '#B5E4CA',
        tooltip: 'Total value of confirmed orders ',
      },
      {
        title: 'Average value per Order',
        counter: ordersSummary?.averageValue,
        icon: 'average-value-yellow',
        color: '#B1E5FC',
        tooltip: 'Average value of product(s) in a single order',
      },
      {
        title: 'Average product per Order',
        counter: ordersSummary?.averageProduct,
        icon: 'store-orange',
        color: '#b8e6fc',
        tooltip: 'Average number of product(s) in a single order',
      },
    ];
  }, [
    ordersSummary?.averageValue,
    ordersSummary?.totalRevenue,
    ordersSummary?.totalOrders,
    ordersSummary?.averageProduct,
  ]);

  return (
    <div className="row d-flex justify-content-start p-0 mb-4 mb-lg-0 p-md-4">
      {items.map((x, index) => (
        <div className={cn('col-12 col-sm-6 col-md-3', styles.item)}>
          <SummaryCard data={x} index={index} />
        </div>
      ))}
    </div>
  );
};

export default Overview;
