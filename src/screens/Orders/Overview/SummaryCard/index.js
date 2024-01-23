import React from 'react';
import cn from 'classnames';
import styles from './SummaryCard.module.sass';
import { handleLongNumber } from '../../../../utils/helpers';
import Tooltip from '../../../../components/Tooltip';
import Skeleton from 'react-loading-skeleton';
import Icon from '../../../../components/Icon';

const SummaryCard = ({ data, index }) => {
  return (
    <div className={cn(styles.boxShadow, 'p-4')} key={index}>
      <div className={styles.icon}>
        <div className="mb-2">
          <Icon name={data.icon} />
        </div>
      </div>
      <div>
        <div className={cn(styles.label, 'my-1')}>
          <span>{data.title}</span>
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
            <Skeleton className={styles.skeleton} height={36} />
          </>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
