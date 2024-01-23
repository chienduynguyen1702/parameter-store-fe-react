import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import cn from 'classnames';
import styles from './Dropdown.module.sass';

import Tooltip from '../Tooltip';

const Dropdown = ({
  className,
  classDropdownHead,
  classDropdownBody,
  classDropdownLabel,
  value,
  setValue,
  onChangeData,
  options = [],
  label,
  tooltip,
  small,
  upBody,
  invisibleLabel,
  disabled = false,
  error,
  active,
  ...others
}) => {
  const [visible, setVisible] = useState(false);
  const [labelDropdown, setLabelDropdown] = useState(value);

  const handleClick = (value, key = null) => {
    setLabelDropdown(value);
    setValue(key);
    setVisible(false);
    onChangeData(value);
  };

  useEffect(() => {
    if (!active) {
      setLabelDropdown(value);
    }

    options.forEach((value2, index) => {
      if (typeof value2 === 'object') {
        const { id, ...data } = value2;
        if (id === value) {
          setLabelDropdown(data[Object.keys(data)]);
        }
      } else {
        setLabelDropdown(value);
      }
    });
  }, [active, options, value]);

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      {label && (
        <div className={cn(styles.label, invisibleLabel, classDropdownLabel)}>
          {label}{' '}
          {tooltip && (
            <Tooltip
              className={error ? styles.tooltipError : styles.tooltip}
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
          <div className={styles.selection}>{labelDropdown}</div>
        </div>
        <div
          className={cn(styles.body, classDropdownBody, {
            [styles.bodyUp]: upBody,
          })}
        >
          {options.map((x, index) => {
            if (typeof x === 'object') {
              const { id, ...data } = x;
              let label = data[Object.keys(data)];
              return (
                <div
                  className={cn(styles.option, {
                    [styles.selectioned]: id === value,
                  })}
                  onClick={() => handleClick(label, id)}
                  key={id}
                >
                  {
                    // is string return x, is object return x.value
                    typeof label === 'string' && label
                  }
                </div>
              );
            } else {
              return (
                <div
                  className={cn(styles.option, {
                    [styles.selectioned]:
                      x === value ||
                      (x?.label && value?.label && x?.label === value?.label),
                  })}
                  onClick={() => handleClick(x, x)}
                  key={index}
                >
                  {
                    // is string return x, is object return x.value
                    typeof x === 'string' ? x : x?.label
                  }
                </div>
              );
            }
          })}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Dropdown;
