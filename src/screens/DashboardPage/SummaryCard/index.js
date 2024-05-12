import moment from 'moment';
import { Card, SummaryCardCustom } from '../../../components';

import cn from 'classnames';
import styles from './SummaryCard.module.sass';

import useQueryString from '../../../hooks/useQueryString';

export default function SummaryCard({ counters }) {
  // console.log('counters', counters);
  const { queryString } = useQueryString();
  const { from, to } = queryString;

  const dateFrom = moment(from).format('DD/MM/YYYY');
  const dateTo = moment(to).format('DD/MM/YYYY');
  const items = [
    {
      icon: 'dashboard-eye-red',
      title: 'Total projects',
      tooltip: `Includes all projects in organization`,
    },
    {
      icon: 'dashboard-eye-red',
      title: 'Number of running projects',
      tooltip: `Number of running projects`,
    },
    {
      icon: 'dashboard-eye-red',
      title: 'Number of running agents',
      tooltip: `Number of running agents`,
    },
    {
      icon: 'dashboard-eye-blue',
      title: 'Total active workflows',
      tooltip: `Total active workflows in all projects`,
    },
    {
      icon: 'dashboard-eye-red',
      title: 'Total users',
      tooltip: `Total active users`,
    },
    {
      icon: 'dashboard-info-green',
      title: 'Average duration',
      tooltip: `Average duration all CICD workflows in organization`,
    },
    {
      icon: 'dashboard-shopping-carts-purple',
      title: 'Total updates this month',
      tooltip: `Number of updates this month`,
    },
    {
      icon: 'dashboard-storage-bag-orange',
      title: 'Total agent actions this month',
      tooltip: `Number of agent pull parameter this month`,
    },
    {
      icon: 'dashboard-camera-blue',
      title: 'Total updates',
      tooltip: `Number of all updates within the organization`,
    },
    {
      icon: 'dashboard-camera-blue',
      title: 'Total agent actions',
      tooltip: `Number of all agent pull parameter within the organization`,
    },
  ];

  return (
    <Card className={cn('row d-flex justify-content-center mx-0', styles.card)}>
      {items.map((x, index) => (
        <div
          className={cn('col-12 col-sm-6 col-md-2.5 col-lg-2dot4', styles.item)}
        >
          <SummaryCardCustom data={x} counter={counters[index]} index={index} />
        </div>
      ))}
    </Card>
  );
}
