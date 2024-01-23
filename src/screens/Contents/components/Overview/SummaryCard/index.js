import React from 'react';
import Skeleton from 'react-loading-skeleton';

import cn from 'classnames';
import styles from './SummaryCard.module.sass';

import { Tooltip, Icon } from '../../../../../components';

import { handleLongNumber } from '../../../../../utils/helpers';

const SummaryCard = ({ data, index }) => {
  return (
    <div className={cn(styles.item, 'p-sm-3 mb-4 mb-sm-0')} key={index}>
      <div>
        <div className="pb-sm-2">
          <Icon name={data.icon} />
        </div>
        <div className={styles.label}>
          <span className={styles.oneLine}>{data.title}</span>
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
            <Skeleton className={styles.skeleton} />
          </>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
