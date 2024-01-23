import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonKOCProfile({
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
              <div key={index} className="col-lg-4 col-sm-6 col-12">
                <div className="mb-2">
                  <Skeleton count={1} height={height} width={'100%'} />
                </div>
                <div className="mb-2">
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
