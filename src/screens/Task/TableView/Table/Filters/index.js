import React, { useState, useCallback } from 'react';

import cn from 'classnames';
import styles from './Filters.module.sass';

import FormFilter from './FormFilter';

import { Icon, ModalWithoutPortal } from '../../../../../components';

const Filters = ({ className, title }) => {
  const [visible, setVisible] = useState(false);

  const invisible = useCallback((vis) => setVisible(vis), []);

  return (
    <div
      className={cn(styles.filters, className, { [styles.active]: visible })}
    >
      {/* Filter button  */}
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
              <FormFilter parentFc={invisible} />
            </div>
          </div>
        </div>
      </ModalWithoutPortal>
    </div>
  );
};

export default Filters;
