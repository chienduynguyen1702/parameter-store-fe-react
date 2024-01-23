import React, { useState, useContext, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';

import cn from 'classnames';
import styles from './User.module.sass';

import Avatar from '../../Avatar';
import Icon from './../../Icon';
import { AuthContext } from '../../../context/AuthContext';

const User = ({ className }) => {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const { me, logout } = useContext(AuthContext);

  const items = useMemo(() => {
    return [
      {
        menu: [
          {
            title: 'Account settings',
            onClick: () => {
              navigate('/user-setting/users/edit-user/me');
            },
          },
          {
            title: 'My Contents',
            onClick: () => {
              navigate(`/koc-profile/me/tiktok`);
            },
          },
          {
            title: 'Log out',
            onClick: () => {
              logout();
            },
          },
        ],
      },
    ];
  }, [logout]);

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className, { [styles.active]: visible })}>
        <button className={styles.head} onClick={() => setVisible(!visible)}>
          <Avatar image={me.avatarUrl} />
        </button>
        <div className={styles.body}>
          {items.map((item, index) => (
            <div className={styles.menu} key={index}>
              {item.menu.map((x, index) =>
                x.url ? (
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        styles.item,
                        { [styles.color]: x.color },
                        { [styles.active]: isActive },
                      )
                    }
                    to={x.url}
                    onClick={() => {
                      x.onClick && x.onClick();
                      setVisible(false);
                    }}
                    key={index}
                  >
                    {x.icon && <Icon name={x.icon} size="24" />}
                    {x.title}
                  </NavLink>
                ) : (
                  <button
                    className={styles.item}
                    onClick={() => {
                      x.onClick && x.onClick();
                      setVisible(false);
                    }}
                    key={index}
                  >
                    {x.title}
                  </button>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default User;
