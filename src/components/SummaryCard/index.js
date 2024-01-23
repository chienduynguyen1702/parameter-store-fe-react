import React from 'react';
import Skeleton from 'react-loading-skeleton';

import cn from 'classnames';
import styles from './SummaryCard.module.sass';
import Tooltip from '../Tooltip';
import Icon from '../Icon';

import { handleLongNumber } from '../../utils/helpers';

const SummaryCard = ({ data, index }) => {
  return (
    <div className={cn(styles.boxShadow, 'p-4')} key={index}>
      <div className={(styles.icon, 'mb-2')}>
        <Icon name={data.icon} />
      </div>
      <div>
        <div className={styles.label}>
          <p>{data.title}</p>
          <Tooltip
            className={styles.tooltip}
            title={data.tooltip}
            icon="info"
            place="top"
          />
        </div>
        {data.counter !== null && data.counter !== undefined ? (
          <div className={styles.counter}>{handleLongNumber(data.counter)}</div>
        ) : (
          <>
            <Skeleton className="w-100" height={30} />
          </>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
