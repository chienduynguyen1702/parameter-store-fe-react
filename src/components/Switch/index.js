import React from 'react';

import cn from 'classnames';
import styles from './Switch.module.sass';

const Switch = ({
  className,
  classLabel,
  classInput,
  value,
  label,
  onChange,
  ...others
}) => {
  return (
    <div className={className}>
      <p className={cn(styles.label, classLabel)}>{label}</p>
      <label className={cn(styles.switch, classInput)}>
        <input
          className={styles.input}
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          {...others}
        />
        <span className={styles.inner}>
          <span className={styles.box}></span>
        </span>
      </label>
    </div>
  );
};

export default Switch;
