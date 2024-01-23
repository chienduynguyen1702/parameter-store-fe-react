import React, { useState } from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import styles from './Popover.module.sass';
import cn from 'classnames';

import Icon from '../Icon';

import { sleep } from '../../utils/helpers';

export default function CustomerPopover({ contents, children, classNameBtn }) {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleOpenPopover = () => {
    setShowOverlay(true);
  };

  const popover = (
    <Popover id="popover-basic" className={cn(styles.popover)}>
      <Popover.Body className={styles.popoverBody}>
        {contents &&
          contents.map((item, index) => (
            <div
              key={index}
              onClick={async () => {
                item.sleepTime && (await sleep(Number(item.sleepTime)));
                setShowOverlay(false);
              }}
              className={cn(styles.outer)}
            >
              <div
                className={cn(
                  'd-flex justify-content-between align-items-center',
                  styles.item,
                )}
                onClick={item.onClick}
                style={{
                  backgroundColor: item.color && item.color.bgColor,
                  color: item.color ? item.color.textColor : '#6F767E',
                }}
              >
                {item.component}
                {item.icon && <Icon name="check" size="24" fill="white" />}
              </div>
            </div>
          ))}
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger={['click']}
      placement="bottom"
      overlay={popover}
      show={showOverlay}
      onToggle={setShowOverlay}
      rootClose
    >
      <button className={classNameBtn} onClick={handleOpenPopover}>
        {children}
      </button>
    </OverlayTrigger>
  );
}
