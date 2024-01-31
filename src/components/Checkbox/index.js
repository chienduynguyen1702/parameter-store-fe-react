import React from 'react';
import { Stack } from 'react-bootstrap';

import styles from './Checkbox.module.sass';
import cn from 'classnames';
import Image from '../Image';

const Checkbox = ({
  className,
  classLabel,
  classInput,
  image = '',
  smallCheckbox = false,
  content,
  value,
  onChange,
}) => {
  return (
    <Stack
      className={cn(`py-2 ${className}`, styles.container)}
      direction="horizontal"
    >
      {image !== '' && (
        <Image
          src={image}
          className="mx-2"
          width={40}
          height={40}
          alt="checkbox"
        />
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
        type="checkbox"
        onChange={onChange}
        checked={value}
      />
    </Stack>
  );
};

export default Checkbox;
