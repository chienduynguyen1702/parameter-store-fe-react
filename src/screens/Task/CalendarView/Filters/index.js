import React, { useState, useCallback } from 'react';

import cn from 'classnames';
import styles from './Filters.module.sass';

import Icon from '../../../../components/Icon';
import FormFilter from './FormFilter';

const Filters = ({ className, title }) => {
  const [visible, setVisible] = useState(false);

  const invisible = useCallback((vis) => setVisible(vis), []);

  return (
    <div
      className={cn(styles.filters, className, { [styles.active]: visible })}
    >
      {/* Filter icon  */}
      <button
        className={cn('button-square-stroke button-small', styles.head)}
        onClick={() => setVisible(true)}
      >
        <Icon name="filter" size="24" />
      </button>

      {/* Filter popup  */}
      <div className={styles.body}>
        <div className={styles.top}>
          <div className={cn('title-red', styles.title)}>{title}</div>
          <button className={styles.close} onClick={() => setVisible(false)}>
            <Icon name="close" size="20" />
          </button>
        </div>
        {/* Filter form  */}
        <FormFilter parentFc={invisible} />
      </div>
      <div className={styles.overlay} onClick={() => setVisible(false)}></div>
    </div>
  );
};

export default Filters;
