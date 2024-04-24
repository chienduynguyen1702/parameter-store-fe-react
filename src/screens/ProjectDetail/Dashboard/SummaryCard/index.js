import moment from 'moment';
import { Card, SummaryCardCustom } from '../../../../components';

import cn from 'classnames';
import styles from './SummaryCard.module.sass';

import useQueryString from '../../../../hooks/useQueryString';

export default function SummaryCard({ counters }) {
  console.log('counters', counters);
  const { queryString } = useQueryString();
  const { from, to } = queryString;

  const dateFrom = moment(from).format('DD/MM/YYYY');
  const dateTo = moment(to).format('DD/MM/YYYY');
  const items = [
    {
      icon: 'dashboard-info-green',
      title: 'Total KOCs',
      tooltip: `Active KOCs from ${dateFrom} to ${dateTo}`,
    },
    {
      icon: 'dashboard-shopping-carts-purple',
      title: 'Total revenues',
      tooltip: `Total revenues generated from products from ${dateFrom} to ${dateTo}`,
    },
    {
      icon: 'dashboard-storage-bag-orange',
      title: 'Total products sold',
      tooltip: `Number of products sold from ${dateFrom} to ${dateTo}`,
    },
    {
      icon: 'dashboard-camera-blue',
      title: 'Total contents',
      tooltip: `Total contents from ${dateFrom} to ${dateTo}`,
    },
    {
      icon: 'dashboard-eye-blue',
      title: 'Total views',
      tooltip: `Total views from ${dateFrom} to ${dateTo}`,
    },

    {
      icon: 'dashboard-eye-red',
      title: 'Average views per KOC',
      tooltip: `Average views per KOC from ${dateFrom} to ${dateTo}`,
    },
  ];

  return (
    <Card className={cn('row d-flex justify-content-center mx-0', styles.card)}>
      {items.map((x, index) => (
        <div
          key={index}
          className={cn('col-12 col-sm-4 col-xl-2', styles.item)}
        >
          <SummaryCardCustom data={x} counter={counters[index]} />
        </div>
      ))}
    </Card>
  );
}
