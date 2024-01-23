import React from 'react';

import cn from 'classnames';
import styles from './Header.module.sass';

const Header = () => {
  return (
    <header className={styles.header}>
      <p className={cn(styles.title)}>Policy</p>
    </header>
  );
};

export default Header;
