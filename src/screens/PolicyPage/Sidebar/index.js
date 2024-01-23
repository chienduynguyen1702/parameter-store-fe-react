import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Sidebar.module.sass';
import cn from 'classnames';

import { Icon } from '../../../components';
import LogoContainer from '../../../components/LogoContainer';

const Sidebar = ({ className }) => {
  return (
    <>
      <div className={cn(styles.sidebar, className)}>
        <LogoContainer className={styles.logo} />
        <NavLink className={styles.item} to={'/'} end>
          <Icon name="arrow-right" size="24" />
          Sign in
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
