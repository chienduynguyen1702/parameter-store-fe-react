import React, { useState, useCallback } from 'react';

import cn from 'classnames';
import styles from './DashboardFilter.module.sass';

import Icon from '../../../../components/Icon';

const DashboardFilter = ({ className, children }) => {
  const [visible, setVisible] = useState(false);

  const invisible = useCallback((vis) => setVisible(vis), []);

  return (
    <div
      className={cn(styles.filters, className, { [styles.active]: visible })}
    >
      <button
        className={cn('button-square-stroke button-small', styles.head)}
        onClick={() => setVisible(true)}
      >
        <Icon name="filter" size="24" />
      </button>

      <div className={styles.body}>
        <div className={styles.top}>
          <div className={cn('title-red', styles.title)}>Filter</div>
          <button className={styles.close} onClick={() => setVisible(false)}>
            <Icon name="close" size="20" />
          </button>
        </div>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { parentFc: invisible });
          }
          return child;
        })}
      </div>
      <div className={styles.overlay} onClick={() => setVisible(false)}></div>
    </div>
  );
};

export default DashboardFilter;
