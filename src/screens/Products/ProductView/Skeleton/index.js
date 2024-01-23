import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import cn from 'classnames';
import styles from './SkeletonView.module.sass';

import { RHFLabel } from '../../../../components';

export default function SkeletonView() {
  return (
    <div>
      <div className="d-flex flex-column justify-content-between">
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <Skeleton variant="rounded" width={96} height={96} />
          </div>
          <div className="d-flex row g-0">
            <div
              className={cn('col-12 col-sm- my-1 p-0 w-auto cursor-pointer')}
            >
              <Skeleton variant="rounded" width={215} height={48} />
            </div>
            <div className="w-auto my-1 p-0">
              <Skeleton variant="rounded" width={98} height={48} />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <RHFLabel label="Name" tooltip="Name of product" />
          <Skeleton variant="rounded" width={360} height={48} />
        </div>
        <div className="mb-4">
          <RHFLabel label="Code" tooltip="Code of product" />
          <Skeleton variant="rounded" width={360} height={48} />
        </div>
        <div className="mb-4">
          <RHFLabel label="Category" tooltip="Category of product" />
          <Skeleton variant="rounded" width={360} height={18} />
          <Skeleton variant="rounded" width={360} height={18} />
          <Skeleton variant="rounded" width={360} height={18} />
        </div>
        <div className="mb-4">
          <RHFLabel label="Type" tooltip="Type of product" />
          <Skeleton variant="rounded" width={360} height={18} />
          <Skeleton variant="rounded" width={360} height={18} />
          <Skeleton variant="rounded" width={360} height={18} />
        </div>
        <div className="mb-4">
          <RHFLabel label="Full price" tooltip="Full price of product" />
          <Skeleton variant="rounded" width={360} height={48} />
        </div>
        <div className="mb-4">
          <RHFLabel label="Current price" tooltip="Current price of product" />
          <Skeleton variant="rounded" width={360} height={48} />
        </div>
        <div className="mb-4">
          <RHFLabel
            label="Discounted rate"
            tooltip="Discounted rate of product"
          />
          <Skeleton variant="rounded" width={360} height={48} />
        </div>
        <div className="mt-2 pt-4 border-top d-flex justify-content-end">
          <div className="me-2">
            <Skeleton variant="rounded" width={94} height={52} />
          </div>
          <div>
            <Skeleton variant="rounded" width={78} height={52} />
          </div>
        </div>
      </div>
    </div>
  );
}
