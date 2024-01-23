import React, { useState } from 'react';

import cn from 'classnames';
import styles from './Archived.module.sass';

import Icon from '../Icon';
import { BiArchiveIn } from 'react-icons/bi';

const Archived = ({ className, classNameBtn, children, title }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={cn(styles.archived, className, { [styles.active]: visible })}
    >
      <button
        className={cn(styles.btnArchive, classNameBtn)}
        onClick={() => setVisible(true)}
      >
        <span className="me-1">Archived</span>
        <BiArchiveIn className="mb-0" size={20} />
      </button>
      <div className={styles.body}>
        <div className={styles.top}>
          <div className={cn('title-red', styles.title)}>{title}</div>
          <button className={styles.close} onClick={() => setVisible(false)}>
            <Icon name="close" size="20" />
          </button>
        </div>
        {visible && children}
      </div>
      <div className={styles.overlay} onClick={() => setVisible(false)}></div>
    </div>
  );
};

export default Archived;
