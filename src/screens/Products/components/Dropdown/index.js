import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import cn from 'classnames';
import styles from './Dropdown.module.sass';

import Tooltip from '../../../../components/Tooltip';

const Dropdown = ({
  className,
  classDropdownHead,
  classDropdownBody,
  classDropdownLabel,
  value,
  setValue,
  options = [],
  label,
  tooltip,
  small,
  upBody,
  invisibleLabel,
  disabled = false,
  ...others
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setValue(value);
  }, []);

  const handleClick = (value) => {
    setValue(value);
    setVisible(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      {label && (
        <div className={cn(styles.label, invisibleLabel, classDropdownLabel)}>
          {label}{' '}
          {tooltip && (
            <Tooltip
              className={styles.tooltip}
              title={tooltip}
              icon="info"
              place="right"
            />
          )}
        </div>
      )}
      <div
        className={cn(
          styles.dropdown,
          className,
          { [styles.small]: small },
          {
            [styles.active]: visible,
          },
        )}
      >
        <div
          className={cn(styles.head, classDropdownHead)}
          onClick={() => setVisible(!visible && !disabled)}
        >
          <div className={styles.selection}>
            {
              // is string return value, is object return value.value
              typeof value === 'string' ? value : value?.label
            }
          </div>
        </div>
        <div
          className={cn(styles.body, classDropdownBody, {
            [styles.bodyUp]: upBody,
          })}
        >
          {options.map((x, index) => (
            <div
              className={cn(styles.option, {
                [styles.selectioned]:
                  x === value ||
                  (x.label && value.label && x.label === value.label),
              })}
              onClick={() => handleClick(x, index)}
              key={index}
            >
              {
                // is string return x, is object return x.value
                typeof x === 'string' ? x : x.label
              }
            </div>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Dropdown;
