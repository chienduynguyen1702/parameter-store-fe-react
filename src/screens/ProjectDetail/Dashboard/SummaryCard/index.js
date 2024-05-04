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
      icon: 'dashboard-eye-red',
      title: 'Average duration',
      tooltip: `Average duration of workflows this month (second)`,
    },
    {
      icon: 'dashboard-eye-blue',
      title: 'Total workflows',
      tooltip: `Total workflows in project`,
    },
    {
      icon: 'dashboard-info-green',
      title: 'Total updates this sprint',
      tooltip: `Updates from ${dateFrom} to ${dateTo}`,
    },
    {
      icon: 'dashboard-shopping-carts-purple',
      title: 'Total updates this month',
      tooltip: `Total revenues generated from products from ${dateFrom} to ${dateTo}`,
    },
    {
      icon: 'dashboard-storage-bag-orange',
      title: 'Total agent run this sprint',
      tooltip: `Total agent run this sprint`,
    },
    {
      icon: 'dashboard-camera-blue',
      title: 'Total agent run this month',
      tooltip: `Total agent run from ${dateFrom} to ${dateTo}`,
    },

  ];

  return (
    <Card className={cn('row d-flex justify-content mx-0', styles.card)}>
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
