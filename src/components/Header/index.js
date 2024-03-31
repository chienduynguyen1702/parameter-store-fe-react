import React, { useState, useContext } from 'react';
import cn from 'classnames';
import styles from './Header.module.sass';
import User from './User';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ onOpen }) => {
  const [, setVisible] = useState(false);

  const { me } = useContext(AuthContext);

  const handleClick = () => {
    onOpen();
    setVisible(false);
  };

  return (
    <header className={styles.header}>
      <button className={styles.burger} onClick={() => handleClick()}></button>
      <p className={cn(styles.title)}>Hello, {me?.username ?? me.email}!</p>
      <div className={styles.control} onClick={() => setVisible(false)}>
        <User className={styles.user} />
      </div>
    </header>
  );
};

export default Header;
