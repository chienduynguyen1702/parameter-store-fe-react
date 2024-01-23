import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import cn from 'classnames';
import styles from './SkeletonTable.module.sass';

export default function SkeletonTable({ limit = 10 }) {
  return (
    <>
      {Array(parseInt(limit))
        .fill(0)
        .map((_, index) => {
          return (
            <div className={cn(styles.row)} key={index}>
              <div className={cn(styles.col)}>
                <Skeleton count={1} height={30} width={'90%'} />
              </div>
              <div className={cn(styles.col)}>
                <Skeleton count={1} height={30} width={'90%'} />
              </div>
              <div className={cn(styles.col)}>
                <Skeleton count={1} height={30} width={'90%'} />
              </div>
              {/* <div className={cn(styles.col)}>
                <Skeleton count={1} height={30} width={'90%'} />
              </div>
              <div className={cn(styles.col)}>
                <Skeleton count={1} height={30} width={'90%'} />
              </div>
              <div className={cn(styles.col)}>
                <Skeleton count={1} height={30} width={'90%'} />
              </div>
              <div className={cn(styles.col)}>
                <Skeleton count={1} height={30} width={'90%'} />
              </div>
              <div className={cn(styles.col)}>
                <Skeleton count={1} height={30} width={'90%'} />
              </div> */}
            </div>
          );
        })}
    </>
  );
}
