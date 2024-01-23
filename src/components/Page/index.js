import React, { useState } from 'react';

import cn from 'classnames';
import styles from './Page.module.sass';

import Sidebar from '../Sidebar';
import Header from '../Header';

import { Outlet } from 'react-router';

const Page = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.page}>
      <Sidebar
        className={cn(styles.sidebar, { [styles.visible]: visible })}
        onClose={() => setVisible(false)}
      />
      <Header onOpen={() => setVisible(true)} />

      <div className={styles.inner}>
        <Outlet />
      </div>
    </div>
  );
};

export default Page;
