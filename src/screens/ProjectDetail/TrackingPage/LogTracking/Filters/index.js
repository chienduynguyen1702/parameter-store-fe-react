import React, { createContext, useMemo } from 'react';
import cn from 'classnames';
import styles from './Filters.module.sass';
import Icon from '../../../../../components/Icon';

export const FiltersContext = createContext();

const Filters = ({ className, children, title, visible, setVisible }) => {
  const FiltersContextValue = useMemo(() => {
    return {
      visible,
      setVisible,
    };
  }, [visible]);

  return (
    <div
      className={cn(styles.filters, className, { [styles.active]: visible })}
    >
      <button
        className={cn(styles.buttonSecondary, styles.head, ' fs-mobile')}
        onClick={() => setVisible(true)}
      >
        <Icon name="filter" size="16" fill="6F767E" />
      </button>
      <div className={styles.body}>
        <FiltersContext.Provider value={FiltersContextValue}>
          {children}
        </FiltersContext.Provider>
      </div>
      <div className={styles.overlay} onClick={() => setVisible(false)}></div>
    </div>
  );
};

export default Filters;
