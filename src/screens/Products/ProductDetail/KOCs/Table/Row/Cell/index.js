import React from 'react';
import styles from './Cell.module.sass';
import cn from 'classnames';

const Cell = ({ item, redIndicator, greenIndicator, blueIndicator }) => {
  return (
    <div className={styles.cell}>
      <div className={styles.box}>
        <div className={styles.number}>{item.counter}</div>
        <div className={styles.line}>
          <div
            className={cn(
              styles.progress,
              { [styles.red]: redIndicator },
              { [styles.green]: greenIndicator },
              { [styles.blue]: blueIndicator },
            )}
            style={{
              width: item.progress,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Cell;
