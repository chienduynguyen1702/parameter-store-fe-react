import { Card, SummaryCardCustom } from '../../../../components';

import cn from 'classnames';
import styles from './SummaryCard.module.sass';

import useQueryString from '../../../../hooks/useQueryString';
import moment from 'moment';

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
      icon: 'dashboard-shopping-carts-purple',
      title: 'Total Revenue',
      tooltip: `Total revenues from ${dateFrom} to ${dateTo}`,
    },
    {
      icon: 'dashboard-storage-bag-orange',
      title: 'Total product sold',
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
        <div className={cn('col-12 col-sm-4 col-lg-2', styles.item)}>
          <SummaryCardCustom data={x} counter={counters[index]} index={index} />
        </div>
      ))}
    </Card>
  );
}
