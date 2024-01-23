import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import cn from 'classnames';
import styles from './RHFDropdown.module.sass';

import DropdownCustom from './DropdownCustom';

export default function RHFDropdownCustom({
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
            <DropdownCustom
              value={value || defaultValue}
              setValue={onChange}
              onBlur={onBlur}
              data={data}
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
