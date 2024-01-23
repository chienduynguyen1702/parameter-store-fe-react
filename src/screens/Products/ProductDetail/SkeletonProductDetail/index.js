import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import cn from 'classnames';
import styles from './SkeletonProductDetail.module.sass';

export default function SkeletonProductDetail({
  limit = 10,
  height = 400,
  className,
}) {
  return (
    <>
      <div className={className}>
        {Array(parseInt(limit))
          .fill(0)
          .map((_, index) => {
            return (
              <div key={index} className={cn('col-lg-3 col-sm-6 col-12')}>
                <div className={cn('mb-2')}>
                  <Skeleton count={1} height={height} width={'100%'} />
                </div>
                <div className={cn(styles.line, 'mb-2')}>
                  <Skeleton count={1} height={24} width={'100%'} />
                </div>
                <Skeleton count={1} height={24} width={'100%'} />
              </div>
            );
          })}
      </div>
    </>
  );
}
