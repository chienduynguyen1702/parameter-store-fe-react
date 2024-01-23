import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import Decentralization from '../../Decentralization';

import cn from 'classnames';
import styles from './Dropdown.module.sass';

import Icon from '../../Icon';

const Dropdown = ({ className, item, visibleSidebar, setValue, onClick }) => {
  const [visible, setVisible] = useState(false);

  const { pathname } = useLocation();
  const firstLevelPath = pathname.split('/')[1];

  const handleClick = () => {
    setVisible(!visible);
    setValue(true);
  };

  const Head = () => {
    return (
      <button
        className={cn(
          styles.head,
          {
            [styles.active]: firstLevelPath === item.slug,
          },
          { [styles.wide]: visibleSidebar },
        )}
        onClick={() => handleClick()}
      >
        <Icon name={item.icon} size="24" />
        {item.title}
        <Icon name="arrow-down" size="24" />
      </button>
    );
  };

  const handleClose = () => {
    onClick();
    setVisible(false);
  };

  return (
    <div
      className={cn(
        styles.dropdown,
        className,
        { [styles.active]: visible },
        {
          [styles.active]: firstLevelPath === item.slug,
        },
        { [styles.wide]: visibleSidebar },
      )}
    >
      {item.add ? (
        <div
          className={cn(styles.top, {
            [styles.active]: pathname.startsWith('/products/add'),
          })}
        >
          <Head />
          <Link
            className={cn(styles.add, {
              [styles.active]: pathname.startsWith('/products/add'),
            })}
            to="/products/add"
            onClick={() => handleClose()}
          >
            <Icon name="plus" size="10" />
          </Link>
        </div>
      ) : (
        <Head />
      )}
      <div className={styles.body}>
        {item.dropdown.map((x, index) => (
          <Decentralization key={index} permissions={x.permissions}>
            <NavLink
              className={({ isActive }) =>
                cn(styles.link, { [styles.active]: isActive })
              }
              to={x.url}
              onClick={() => handleClose()}
              exact
            >
              {x.title}
              {x.counter ? (
                <div
                  className={styles.counter}
                  style={{ backgroundColor: x.colorCounter }}
                >
                  {x.counter}
                </div>
              ) : (
                <Icon name="arrow-next" size="24" />
              )}
            </NavLink>
          </Decentralization>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
