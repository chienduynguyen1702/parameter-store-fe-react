import { AiOutlinePlus } from 'react-icons/ai';
import React, { useCallback, useEffect, useState } from 'react';

import cn from 'classnames';
import styles from './CardDashboard.module.sass';

import {
  handleDataWithGranularity,
  handleObjectArrayToArrayObject,
} from '../../../../../utils/helpers';

export default function CardDashboard({
  setTime,
  title,
  children,
  classTitle,
  addTarget,
  className,
}) {
  const [granularity, setGranularity] = useState('day');

  const handleChangeRangeTime = useCallback(
    (granularity) => {
      setGranularity(granularity);
      if (setTime) {
        setTime(granularity);
      }
    },
    [setTime],
  );

  return (
    <>
      <div className={cn(styles.card, className)}>
        {title && (
          <div className={cn(styles.head, 'row ms-1 my-1 my-md-0')}>
            <div className={cn(classTitle, styles.title, 'col-12 col-md-auto')}>
              {title}
            </div>
            <div
              className={cn(
                'd-flex align-items-center col-12 col-md-auto justify-content-between flex-grow-1',
                styles.btnBox,
              )}
            >
              <div>
                {addTarget ? (
                  <button className={cn('button-small ms-3', styles.btnAdd)}>
                    <AiOutlinePlus className={cn(styles.icon)} />
                    Add Target
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="d-flex py-4 py-md-0">
                <div
                  className={cn(styles.rangeTimeBtn, {
                    [styles.active]: granularity === 'day' ? true : false,
                  })}
                  onClick={() => {
                    handleChangeRangeTime('day');
                  }}
                >
                  Day
                </div>
                <div
                  className={cn(styles.rangeTimeBtn, {
                    [styles.active]: granularity === 'week' ? true : false,
                  })}
                  onClick={() => {
                    handleChangeRangeTime('week');
                  }}
                >
                  Week
                </div>
                <div
                  className={cn(styles.rangeTimeBtn, {
                    [styles.active]: granularity === 'month' ? true : false,
                  })}
                  onClick={() => {
                    handleChangeRangeTime('month');
                  }}
                >
                  Month
                </div>
                <div
                  className={cn(styles.rangeTimeBtn, {
                    [styles.active]: granularity === 'quarter' ? true : false,
                  })}
                  onClick={() => {
                    handleChangeRangeTime('quarter');
                  }}
                >
                  Quarter
                </div>
                <div
                  className={cn(styles.rangeTimeBtn, {
                    [styles.active]: granularity === 'year' ? true : false,
                  })}
                  onClick={() => {
                    handleChangeRangeTime('year');
                  }}
                >
                  Year
                </div>
              </div>
            </div>
          </div>
        )}
        {children}
      </div>
    </>
  );
}
