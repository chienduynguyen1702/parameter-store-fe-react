import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import cn from 'classnames';
import styles from './SkeletonDetailForm.module.sass';

export default function SkeletonDetailForm({ limit = 10 }) {
  return (
    <div className={cn(styles.skeleton)}>
      <Skeleton height={30} count={limit} className={cn(styles.skeleton)} />
    </div>
  );
}
