import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function SkeletonTable({ limit = 10, numberCol = 5 }) {
  return (
    <>
      {Array(parseInt(limit))
        .fill(0)
        .map((_, index) => {
          return (
            <React.Fragment key={'skeleton-' + index}>
              <div
                key={index + 'desktop'}
                className="tableRow w-100 d-none d-sm-table-row"
              >
                <div
                  className="d-table-cell tableCell py-3 ps-3"
                  style={{ minWidth: '300px' }}
                >
                  <div className="d-flex">
                    <Skeleton
                      containerClassName="me-2"
                      width={'60px'}
                      height={80}
                    />
                    <div className="flex-grow-1 mt-2">
                      <Skeleton />
                      <Skeleton width={'40%'} />
                      <Skeleton width={'50%'} />
                    </div>
                  </div>
                </div>
                {Array(numberCol)
                  .fill(0)
                  .map((col, index) => (
                    <Skeleton
                      key={index}
                      containerClassName="d-table-cell tableCell py-3 ps-3"
                      height={30}
                      width={'60px'}
                    />
                  ))}
              </div>

              <div
                key={index + 'mobile'}
                className="d-sm-none pb-4 mt-3 w-100 g-0"
              >
                <div className="d-flex">
                  <div className={1}>
                    <Skeleton
                      containerClassName="me-2"
                      width={'48px'}
                      height={68}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <Skeleton className="mb-2" />
                    <Skeleton className="mb-2" width={'40%'} />
                    <Skeleton className="mb-2" width={'50%'} />
                  </div>
                </div>
                {Array(parseInt(numberCol))
                  .fill(0)
                  .map((col, index) => (
                    <Skeleton key={index} height={20} className="mb-2" />
                  ))}
              </div>
            </React.Fragment>
          );
        })}
    </>
  );
}
