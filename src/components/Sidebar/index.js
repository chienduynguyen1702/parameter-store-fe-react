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
  // {
  //   title: 'Dashboard',
  //   icon: 'pie-chart',
  //   slug: 'dashboard',
  //   dropdown: [
  //     {
  //       title: 'Highlights',
  //       url: '/dashboard/highlight',
  //       permissions: [''],
  //     },
  //     {
  //       title: 'KOCs',
  //       url: '/dashboard/kocs',
  //       permissions: [''],
  //     },
  //     {
  //       title: 'Contents',
  //       url: '/dashboard/contents',
  //       permissions: [''],
  //     },
  //     {
  //       title: 'Orders',
  //       url: '/dashboard/orders',
  //       permissions: [''],
  //     },
  //     {
  //       title: 'Products',
  //       url: '/dashboard/products',
  //       permissions: [''],
  //     },
  //   ],
  // },
  {
    title: 'Contents',
    icon: 'video-stroke',
    slug: 'content',
    dropdown: [
      {
        title: 'TikTok',
        url: '/content/tiktok',
        permissions: ['content-tiktok'],
      },
      {
        title: 'Facebook',
        url: '/content/facebook',
        permissions: ['content-facebook'],
      },
      {
        title: 'Youtube',
        url: '/content/youtube',
        permissions: ['content-youtube'],
      },
      {
        title: 'Instagram',
        url: '/content/instagram',
        permissions: ['content-instagram'],
      },
      {
        title: 'Other Contents',
        url: '/content/other-contents',
        permissions: ['content-other'],
      },
    ],
  },
  // {
  //   title: 'KOCs',
  //   icon: 'profile-circle',
  //   url: '/kocs',
  //   subUrl: '/koc-profile',
  //   permissions: ['user'],
  // },
  {
    title: 'Products',
    icon: 'box',
    url: '/products',
    subUrl: '/product-detail',
    permissions: ['product'],
  },

  // {
  //   title: 'Orders',
  //   icon: 'cart',
  //   url: '/orders',
  //   permissions: ['orders'],
  // },

  {
    title: 'Tasks',
    icon: 'calendar',
    slug: 'tasks',
    dropdown: [
      {
        title: 'Calendar View',
        url: '/tasks/calendar-view',
        permissions: ['task'],
      },
      {
        title: 'Table View',
        url: '/tasks/table-view',
        permissions: ['task'],
      },
    ],
  },
  // {
  //   title: 'Pampering',
  //   icon: 'cake',
  //   slug: 'pamperings',
  //   dropdown: [
  //     {
  //       title: 'Calendar View',
  //       url: '/pamperings/calendar-view',
  //       permissions: ['pampering'],
  //     },
  //     {
  //       title: 'Table View',
  //       url: '/pamperings/table-view',
  //       permissions: ['pampering'],
  //     },
  //   ],
  // },
  // {
  //   title: 'Liquidation',
  //   icon: 'check-not-filled',
  //   url: '/liquidation',
  //   subUrl: '/liquidation-file',
  //   permissions: ['liquidation'],
  // },
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
