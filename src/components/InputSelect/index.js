import React, { useEffect, useRef } from 'react';
import Select from 'react-select';

import styles from './InputSelect.module.sass';
import cn from 'classnames';

import { Tooltip } from '../';

const InputSelect = ({
  className,
  value,
  label,
  classLabel,
  tooltip,
  error,
  place,
  icon,
  copy,
  currency,
  setValue,
  suggestions,
}) => {
  const selectRef = useRef();
  useEffect(() => {
    if (value) {
      selectRef.current.setValue({
        label: value,
        value: value,
      });
    }
  }, [value]);
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
        <div className={cn(classLabel, styles.label)}>
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
      <Select
        ref={selectRef}
        className={cn(styles.selectInput, 'selectInput')}
        options={suggestions}
        onChange={(value) => setValue(value.value)}
        defaultValue={value}
      />
    </div>
  );
};

export default InputSelect;
