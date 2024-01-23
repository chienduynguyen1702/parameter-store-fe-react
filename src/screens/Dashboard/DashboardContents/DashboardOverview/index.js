import moment from 'moment';
import { useMemo } from 'react';

import cn from 'classnames';
import styles from './SummaryCard.module.sass';

import { Card, SummaryCardCustom } from '../../../../components';

import useQueryString from '../../../../hooks/useQueryString';

export default function DashboardOverview({ counters }) {
  const { queryString } = useQueryString();
  const { from, to } = queryString;

  const dateFrom = useMemo(() => moment(from).format('MM-DD-YYYY'), [from]);
  const dateTo = useMemo(() => moment(to).format('MM-DD-YYYY'), [to]);

  const items = [
    {
      icon: 'dashboard-info-green',
      title: 'Total KOCs',
      tooltip: `Active KOCs from ${dateFrom} to ${dateTo}`,
    },
    {
      icon: 'dashboard-camera-green',
      title: 'Total Videos',
      tooltip: `Total Videos from ${dateFrom} to ${dateTo}`,
    },
    {
      icon: 'dashboard-live-purple',
      title: 'Total Live Streams',
      tooltip: `Total Live Streams from ${dateFrom} to ${dateTo}`,
    },
    {
      icon: 'dashboard-play-orange',
      title: 'Total Stories',
      tooltip: `Total Stories from ${dateFrom} to ${dateTo}`,
    },

    {
      icon: 'dashboard-clicker-blue',
      title: 'Total Posts',
      tooltip: `Total Posts from ${dateFrom} to ${dateTo}`,
    },
    {
      icon: 'dashboard-eye-green',
      title: 'Total Views',
      tooltip: `Total views from ${dateFrom} to ${dateTo}`,
    },
    {
      icon: 'dashboard-like-purple',
      title: 'Total Likes',
      tooltip: `Total Likes from ${dateFrom} to ${dateTo}`,
    },
    {
      icon: 'dashboard-comment-orange',
      title: 'Total Comments',
      tooltip: `Total Comments from ${dateFrom} to ${dateTo}`,
    },
    {
      icon: 'dashboard-share-blue',
      title: 'Total Shares',
      tooltip: `Total Shares from ${dateFrom} to ${dateTo}`,
    },
    {
      icon: 'dashboard-box-green',
      title: 'Total Saves',
      tooltip: `Total Saves from ${dateFrom} to ${dateTo}`,
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
