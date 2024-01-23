import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import styles from './FiltersCustom.module.sass';

import Icon from '../Icon';
import ModalWithoutPortal from '../ModalWithoutPortal';

export default function FiltersCustom({
  className,
  title = 'Filter',
  children,
}) {
  const [visible, setVisible] = useState(false);

  const invisible = useCallback((vis) => setVisible(vis), []);

  return (
    <div
      className={cn(styles.filters, className, { [styles.active]: visible })}
    >
      <button
        className={cn('button-square-stroke button-small', styles.head)}
        onClick={() => setVisible(true)}
      >
        <Icon name="filter" size="24" />
      </button>
      {/* Filter modal  */}
      <ModalWithoutPortal
        modalClassName="d-block"
        visible={visible}
        onClose={() => {
          invisible(false);
        }}
      >
        <div
          className={cn(styles.filters, className, {
            [styles.active]: visible,
          })}
        >
          <div>
            <div>
              <div className="mb-3">
                <div className={cn('title-red', styles.title)}>{title}</div>
              </div>
              {React.Children.map(children, (child) => {
                return React.cloneElement(child, { parentFc: invisible });
              })}
            </div>
          </div>
        </div>
      </ModalWithoutPortal>
    </div>
  );
}
