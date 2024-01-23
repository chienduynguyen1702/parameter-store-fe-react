import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './Overview.module.sass';

import SummaryCard from './SummaryCard';

const Overview = ({ statistics }) => {
  const items = useMemo(() => {
    return [
      {
        title: 'Total Views',
        counter: statistics?.totalView,
        icon: 'eye-green',
        color: '#B5E4CA',
        tooltip: `${parseInt(statistics?.totalView).toLocaleString(
          'en-US',
        )} views`,
      },
      {
        title: 'Total Likes',
        counter: statistics?.totalLike,
        icon: 'heart-purple',
        color: '#CABDFF',
        tooltip: `${parseInt(statistics?.totalLike).toLocaleString(
          'en-US',
        )} likes`,
      },
      {
        title: 'Total Comments',
        counter: statistics?.totalComment,
        icon: 'chat-orange',
        color: '#B1E5FC',
        tooltip: `${parseInt(statistics?.totalComment).toLocaleString(
          'en-US',
        )} comments`,
      },
      {
        title: 'Total Saves',
        counter: statistics?.totalSave,
        icon: 'save-green',
        color: '#b8e6fc',
        tooltip: `${parseInt(statistics?.totalSave).toLocaleString(
          'en-US',
        )} saves`,
      },
      {
        title: 'Total Shares',
        counter: statistics?.totalShare,
        icon: 'share-blue',
        color: '#FFBC99',
        tooltip: `${parseInt(statistics?.totalShare).toLocaleString(
          'en-US',
        )} shares`,
      },
    ];
  }, [
    statistics?.totalComment,
    statistics?.totalLike,
    statistics?.totalShare,
    statistics?.totalView,
    statistics?.totalSave,
  ]);

  return (
    <div
      className={cn(
        styles.overview,
        'd-flex flex-wrap g-0 p-0 mb-4 mb-lg-0 p-md-4',
      )}
    >
      {items.map((x, index) => (
        <div
          key={index}
          className={cn('col-6 col-sm-4 col-md-2.4 col-lg-2dot4', styles.item)}
        >
          <SummaryCard data={x} index={index} />
        </div>
      ))}
    </div>
  );
};

export default Overview;
