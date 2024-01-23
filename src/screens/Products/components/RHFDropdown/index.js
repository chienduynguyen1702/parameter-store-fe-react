import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import cn from 'classnames';
import styles from './RHFDropdown.module.sass';

import Dropdown from '../Dropdown';

export default function RHFDropdown({
  name,
  data,
  defaultValue,
  classError,
  ...others
}) {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <Dropdown
              value={value || defaultValue}
              setValue={onChange}
              onBlur={onBlur}
              options={data}
              {...others}
            />
            {error ? (
              <p className={cn(styles.redLine, classError)}>{error.message}</p>
            ) : (
              <p className={cn(styles.hidden, styles.redLine, classError)}>.</p>
            )}
          </>
        )}
      />
    </>
  );
}
