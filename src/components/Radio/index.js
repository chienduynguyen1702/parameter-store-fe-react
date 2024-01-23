import React from 'react';
import { Stack } from 'react-bootstrap';

import styles from './Radio.module.sass';
import cn from 'classnames';

const Radio = ({
  className,
  classLabel,
  classInput,
  image = '',
  smallCheckbox = false,
  content,
  value,
  onChange,
  checked,
}) => {
  return (
    <Stack
      className={cn(`py-2 ${className}`, styles.container)}
      direction="horizontal"
    >
      {image !== '' && (
        <img src={image} className="mx-2" width={20} height={20} alt="radio" />
      )}
      {content && (
        <span className={(styles.label, classLabel)}>
          {content.length > 50 ? content.slice(0, 50) + '...' : content}
        </span>
      )}
      <input
        className={cn('ms-auto', styles.checkbox, classInput, {
          [styles.small]: smallCheckbox,
        })}
        type="radio"
        onChange={() => {
          onChange(value);
        }}
        checked={checked}
      />
    </Stack>
  );
};

export default Radio;
