import { AiOutlinePlus } from 'react-icons/ai';
import React from 'react';

import cn from 'classnames';
import styles from './CardDashboard.module.sass';

export default function CardDashboard({
  title,
  children,
  classTitle,
  addTarget,
  granularity = 'day',
  head,
  setGranularity,
}) {
  return (
    <>
      <div className={cn(styles.card)}>
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
                {head && head}
                <div
                  className={cn(styles.rangeTimeBtn, {
                    [styles.active]: granularity === 'day' ? true : false,
                  })}
                  onClick={() => {
                    setGranularity('day');
                  }}
                >
                  Day
                </div>
                <div
                  className={cn(styles.rangeTimeBtn, {
                    [styles.active]: granularity === 'week' ? true : false,
                  })}
                  onClick={() => {
                    setGranularity('week');
                  }}
                >
                  Week
                </div>
                <div
                  className={cn(styles.rangeTimeBtn, {
                    [styles.active]: granularity === 'month' ? true : false,
                  })}
                  onClick={() => {
                    setGranularity('month');
                  }}
                >
                  Month
                </div>
                <div
                  className={cn(styles.rangeTimeBtn, {
                    [styles.active]: granularity === 'quarter' ? true : false,
                  })}
                  onClick={() => {
                    setGranularity('quarter');
                  }}
                >
                  Quarter
                </div>
                <div
                  className={cn(styles.rangeTimeBtn, {
                    [styles.active]: granularity === 'year' ? true : false,
                  })}
                  onClick={() => {
                    setGranularity('year');
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
