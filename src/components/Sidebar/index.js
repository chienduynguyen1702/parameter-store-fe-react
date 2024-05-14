import React, { useContext, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './Sidebar.module.sass';
import cn from 'classnames';

import Icon from '../Icon';
import Dropdown from './Dropdown';
import LogoContainer from '../LogoContainer';
import { AuthContext } from '../../context/AuthContext';

const navigation = [
  // {
  //   title: 'Home',
  //   icon: 'home',
  //   url: '/',
  //   permissions: [''],
  // },
  {
    title: 'Dashboard',
    icon: 'activity',
    url: '/dashboard',
    permissions: [''],
  },
  {
    title: 'Parameters',
    icon: 'diamond',
    url: '/projects',
    permissions: [''],
  },
];

const Sidebar = ({ className, onClose }) => {
  // get me from AuthContext
  const { me } = useContext(AuthContext);
  // console.log('me', me);
  const { pathname } = useLocation();
  const firstLevelPath = '/' + pathname.split('/')[1];

  const [visible, setVisible] = useState(false);
  return (
    <>
      <div
        className={cn(styles.sidebar, className, { [styles.active]: visible })}
      >
        <button
          className={styles.close}
          onClick={() => {
            onClose();
          }}
        >
          <Icon name="close" size="24" />
        </button>
        <LogoContainer className={styles.logo} />
        <div className={styles.menu}>
          {navigation.map((x, index) => {
            if (x.url) {
              if (x.title === 'Dashboard' && !me?.isOrganizationAdmin) {
                return null; // Skip rendering NavLink for Dashboard
              } else {
                return (
                  <NavLink
                    key={index}
                    className={({ isActive }) =>
                      cn(styles.item, {
                        [styles.active]:
                          isActive || firstLevelPath === x.subUrl,
                      })
                    }
                    to={x.url}
                    end
                    onClick={() => {
                      onClose();
                      setVisible(false);
                    }}
                  >
                    <Icon name={x.icon} size="24" />
                    {x.title}
                  </NavLink>
                );
              }
            } else {
              return (
                <Dropdown
                  key={index}
                  className={styles.dropdown}
                  visibleSidebar={visible}
                  setValue={setVisible}
                  item={x}
                  onClick={() => {
                    onClose();
                    setVisible(false);
                  }}
                />
              );
            }
          })}
        </div>

        <button className={styles.toggle} onClick={() => setVisible(!visible)}>
          <Icon name="arrow-right" size="24" />
          <Icon name="close" size="24" />
        </button>
        <div className={styles.foot}>
          <button className={styles.link}>
            <NavLink
              className={({ isActive }) =>
                cn(styles.item, { [styles.active]: isActive })
              }
              to={'/user-setting/users'}
              end
              onClick={() => {
                onClose();
                setVisible(false);
              }}
            >
              <Icon name="setting" size="24" />
              Users & Settings
            </NavLink>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
