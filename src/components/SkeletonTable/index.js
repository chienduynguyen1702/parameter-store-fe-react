import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonTable({
  limit = 10,
  avatar = false,
  firstColWidth = 200,
  colsDesktop = 5,
  rowsMobile = 5,
  threeDotsCols = false,
  desktop = true,
  mobile = true,
}) {
  return (
    <>
      {Array(parseInt(limit))
        .fill(0)
        .map((_, index) => {
          return (
            <React.Fragment key={'skeleton-' + index}>
              {desktop && (
                <div
                  className="tableRow w-100 d-none d-sm-table-row"
                  key={'desktop-' + index} // Use a unique key for desktop rows
                >
                  {avatar && (
                    <div
                      className="d-table-cell tableCell py-3 ps-3"
                      style={{ minWidth: firstColWidth }}
                    >
                      <div className="d-flex justify-content-center align-items-center">
                        <Skeleton
                          containerClassName="me-2"
                          circle
                          height={48}
                          width={48}
                        />
                        <div className="flex-grow-1">
                          <Skeleton width={'80%'} />
                          <Skeleton width={'60%'} />
                        </div>
                      </div>
                    </div>
                  )}
                  {colsDesktop > 0 &&
                    Array(parseInt(colsDesktop))
                      .fill(0)
                      .map((col, index) => (
                        <Skeleton
                          key={'desktop-col-' + index}
                          containerClassName="d-table-cell tableCell py-3 ps-3"
                          height={24}
                          width={'80%'}
                        />
                      ))}
                  {threeDotsCols && (
                    <Skeleton
                      containerClassName="d-table-cell tableCell py-3 ps-3"
                      height={20}
                      width={'60%'}
                    />
                  )}
                </div>
              )}
              {mobile && (
                <div
                  className="d-sm-none pb-4 mt-3 w-100 g-0"
                  key={'mobile-' + index}
                >
                  {avatar && (
                    <div className="d-flex">
                      <Skeleton
                        containerClassName="me-2"
                        circle
                        height={48}
                        width={48}
                      />
                      <div className="flex-grow-1">
                        <Skeleton height={48} className="mb-2" />
                      </div>
                    </div>
                  )}
                  {rowsMobile > 0 &&
                    Array(parseInt(rowsMobile))
                      .fill(0)
                      .map((col, index) => (
                        <Skeleton
                          key={'mobile-row-' + index}
                          height={20}
                          className="mb-2"
                        />
                      ))}
                </div>
              )}
            </React.Fragment>
          );
        })}
    </>
  );
}
