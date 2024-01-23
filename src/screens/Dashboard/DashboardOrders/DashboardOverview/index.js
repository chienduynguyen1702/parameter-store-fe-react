import moment from 'moment';

import cn from 'classnames';
import styles from './SummaryCard.module.sass';

import { Card, SummaryCardCustom } from '../../../../components';
import useQueryString from '../../../../hooks/useQueryString';

export default function DashboardOverview({ counters }) {
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
      icon: 'dashboard-storage-bag-green',
      title: 'Total Orders',
      tooltip: `Total number of confirmed orders from ${dateFrom} to ${dateTo}`,
    },
    {
      icon: 'dashboard-shopping-carts-purple',
      title: 'Revenues',
      tooltip: `Total revenue of confirmed orders ${dateFrom} to ${dateTo}`,
    },
    {
      icon: 'dashboard-dollar-orange',
      title: 'Average value per Order',
      tooltip: `Average value per Order from ${dateFrom} to ${dateTo}`,
    },

    {
      icon: 'dashboard-box-blue',
      title: 'Average product per Order',
      tooltip: `Average product per Order from ${dateFrom} to ${dateTo}`,
    },
  ];

  return (
    <Card className={cn('row d-flex justify-content-center mx-0', styles.card)}>
      {items.map((x, index) => (
        <div
          className={cn('col-12 col-sm-6 col-md-2.4 col-lg-2dot4', styles.item)}
        >
          <SummaryCardCustom data={x} counter={counters[index]} index={index} />
        </div>
      ))}
    </Card>
  );
}
