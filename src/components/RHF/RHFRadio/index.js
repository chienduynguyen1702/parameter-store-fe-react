import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import cn from 'classnames';
import styles from '../RHFTextInput/RHFTextInput.module.sass';

import Radio from '../../Radio'; // Custom Radio component

function RHFRadio({ name, classError, options, ...others }) {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        name={name}
        control={control}
        // defaultValue={defaultValue}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => {
          return (
            <div>
              {options?.map((option) => (
                <Radio
                  key={option.value}
                  content={option.label}
                  value={{
                    value: option.value,
                    label: option.label,
                    color: option?.color || null,
                    type: option?.type || null,
                  }}
                  onChange={onChange}
                  checked={value && value.value === option.value}
                  {...others}
                />
              ))}
              {error ? (
                <p className={cn(styles.redLine, classError)}>
                  {error.message}
                </p>
              ) : (
                <p className={cn(styles.hidden, styles.redLine, classError)}>
                  .
                </p>
              )}
            </div>
          );
        }}
      />
    </>
  );
}

export default RHFRadio;
