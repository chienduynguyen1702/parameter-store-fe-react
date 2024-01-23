import React, { useState } from 'react';
import InputMask from 'react-input-mask';

import styles from './TextInput.module.sass';
import cn from 'classnames';

import { Icon, Tooltip } from '../';

const TextInput = ({
  className,
  classLabel,
  classInput,
  label,
  icon,
  copy,
  currency,
  tooltip,
  place,
  value,
  onChange,
  error,
  type,
  extract,
  ...props
}) => {
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleInputChange = (event) => {
    onChange(event);
    if (extract) {
      const newValue = event.currentTarget.value;

      // Hủy hẹn giờ cũ nếu có
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      const newTimeout = setTimeout(() => {
        extract?.mutateAsync(newValue);
      }, 1000);
      setTypingTimeout(newTimeout);
    }
  };
  return (
    <div
      className={cn(
        styles.field,
        { [styles.fieldIcon]: icon },
        { [styles.fieldCopy]: copy },
        { [styles.fieldCurrency]: currency },
        className,
      )}
    >
      {label && (
        <div className={cn(classLabel, styles.label, 'color4')}>
          {label}{' '}
          {tooltip && (
            <Tooltip
              className={cn(error ? styles.tooltipError : styles.tooltip)}
              title={tooltip}
              icon="info"
              place={place ? place : 'right'}
              error={true}
            />
          )}
        </div>
      )}
      <div className={styles.wrap}>
        {type === 'phone' ? (
          <InputMask
            value={value}
            onChange={onChange}
            mask="9999 999 999"
            maskChar=" "
            className={cn(classInput, styles.input)}
            {...props}
          />
        ) : (
          <input
            value={value}
            onChange={handleInputChange}
            className={cn(classInput, styles.input)}
            type={type}
            {...props}
          />
        )}
        {icon && (
          <div className={styles.icon}>
            <Icon name={icon} size="24" />{' '}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInput;
