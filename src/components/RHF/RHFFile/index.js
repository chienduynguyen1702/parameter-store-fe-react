import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import cn from 'classnames';
import styles from './RHFFile.module.sass';

import File from '../../File';

function RHFFile({ name, classError, onChange, ...others }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({
        field: { value, onChange: onHookChange },
        fieldState: { error },
      }) => {
        return (
          <>
            <File
              value={value}
              setValue={(value) => {
                onHookChange(value);
                onChange && onChange(value);
              }}
              error={error}
              {...others}
            />
            {error ? (
              <p className={cn(styles.redLine, classError)}>{error.message}</p>
            ) : (
              <p className={cn(styles.hidden, styles.redLine, classError)}>.</p>
            )}
          </>
        );
      }}
    />
  );
}

export default RHFFile;
