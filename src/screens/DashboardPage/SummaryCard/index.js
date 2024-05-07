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
      title: 'Number of archived projects',
      tooltip: `Number of archived projects`,
    },
    {
      icon: 'dashboard-eye-red',
      title: 'Total users',
      tooltip: `Total active users`,
    },
    {
      icon: 'dashboard-eye-blue',
      title: 'Total workflows',
      tooltip: `Total workflows in project`,
    },
    {
      icon: 'dashboard-info-green',
      title: 'Count updates this sprint',
      tooltip: `Count updates from this sprint`,
    },
    {
      icon: 'dashboard-storage-bag-orange',
      title: 'Count agent actions this sprint',
      tooltip: `Count agent actions this sprint`,
    },
    {
      icon: 'dashboard-shopping-carts-purple',
      title: 'Total updates',
      tooltip: `All updates of project `,
    },
    {
      icon: 'dashboard-camera-blue',
      title: 'Total agent actions',
      tooltip: `Total agent actions in this project`,
    },
    {
      icon: 'dashboard-camera-blue',
      title: 'Total agent actions',
      tooltip: `Total agent actions in this project`,
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
