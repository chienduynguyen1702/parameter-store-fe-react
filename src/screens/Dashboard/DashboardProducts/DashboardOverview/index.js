import moment from 'moment';

import cn from 'classnames';
import styles from './SummaryCard.module.sass';

import { Card, SummaryCardCustom } from '../../../../components';

import useQueryString from '../../../../hooks/useQueryString';

export default function DashboardOverview({ counters }) {
  const { queryString } = useQueryString();
  const { from, to } = queryString;

  const fromDate = moment(from).format('DD/MM/YYYY');
  const toDate = moment(to).format('DD/MM/YYYY');

  const items = [
    {
      icon: 'dashboard-info-green',
      title: 'Total KOCs',
      tooltip: `Active KOCs from ${fromDate} to ${toDate}`,
      disabled: false,
    },
    {
      icon: 'dashboard-box-green',
      title: 'Total Products',
      color: '#edf8f1',
      tooltip: `Total products from ${fromDate} to ${toDate}`,
      disabled: false,
    },
    {
      icon: 'dashboard-dollar-purple',
      title: 'No. of Distinct Products Sold',
      color: '#c4e9f6',
      tooltip: `Total distinct products sold from ${fromDate} to ${toDate}`,
      disabled: true,
    },
    {
      icon: 'dashboard-layer-orange',
      title: 'Total Products Sold',
      color: '#e7d8ef',
      tooltip: `Total products sold from ${fromDate} to ${toDate}`,
      disabled: false,
    },
    {
      icon: 'dashboard-line-blue',
      title: 'Total Categories',
      color: '#f4f6c9',
      tooltip: `Total categories from ${fromDate} to ${toDate}`,
      disabled: true,
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
