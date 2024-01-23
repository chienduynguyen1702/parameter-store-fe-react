import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import cn from 'classnames';
import styles from './SummaryCard.module.sass';

import Tooltip from '../Tooltip';
import Icon from '../Icon';

import { handleLongNumber } from '../../utils/helpers';

export default function SummaryCard({ data, counter, index }) {
  return (
    <div
      className={cn(
        styles.borderBottom,
        'p-2 d-flex flex-sm-column flex-row justify-content-sm-center align-items-sm-start align-items-start',
      )}
      key={index}
    >
      <div className="mb-2 me-3 me-sm-0 pt-2 pt-sm-0">
        <Icon name={data.icon} />
      </div>
      <div className="w-100">
        <div className={styles.label}>
          <p>{data.title}</p>
          <Tooltip
            className={styles.tooltip}
            title={data.tooltip}
            icon="info"
            place="top"
          />
        </div>
        {counter !== undefined &&
          counter !== null &&
          !isNaN(counter) &&
          !data.disabled && (
            <div className={styles.counter}>{handleLongNumber(counter)}</div>
          )}
        {(counter === undefined || isNaN(counter)) && (
          <Skeleton width={100} height={36} className="mb-1" />
        )}
        {counter === null && data.disabled && (
          <div className={styles.counter}>N/A</div>
        )}
      </div>
    </div>
  );
}
