import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import cn from 'classnames';
import styles from './SkeletonArchivedTasks.module.sass';

export default function SkeletonArchivedTasks({ limit = 10 }) {
  return (
    <div className={cn(styles.skeleton)}>
      <Skeleton height={60} count={limit} className={cn(styles.skeleton)} />
    </div>
  );
}
