import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './Sidebar.module.sass';
import cn from 'classnames';

import Icon from '../Icon';
import Dropdown from './Dropdown';
import LogoContainer from '../LogoContainer';
import Decentralization from '../Decentralization';

const navigation = [
  {
    title: 'Home',
    icon: 'home',
    url: '/',
    permissions: [''],
  },
  {
    title: 'Projects',
    icon: 'diamond',
    url: '/projects',
    permissions: [''],
  },
  {
    title: 'Secrets',
    icon: 'ticket',
    url: '/secrets',
    permissions: [''],
  },
];

const Sidebar = ({ className, onClose }) => {
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
          {navigation.map((x, index) =>
            x.url ? (
              <Decentralization key={index} permissions={x.permissions}>
                <NavLink
                  className={({ isActive }) =>
                    cn(styles.item, {
                      [styles.active]: isActive || firstLevelPath === x.subUrl,
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
              </Decentralization>
            ) : (
              <Dropdown
                className={styles.dropdown}
                visibleSidebar={visible}
                setValue={setVisible}
                key={index}
                item={x}
                onClick={() => {
                  onClose();
                  setVisible(false);
                }}
              />
            ),
          )}
        </div>
        <Decentralization permissions={['user']}>
          <button
            className={styles.toggle}
            onClick={() => setVisible(!visible)}
          >
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
        </Decentralization>
      </div>
    </>
  );
};

export default Sidebar;
