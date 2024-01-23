import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import cn from 'classnames';
import styles from './RHFDropdown.module.sass';

import Dropdown from '../../Dropdown';

export default function RHFDropdown({
  name,
  data,
  defaultValue,
  classError,
  className,
  classDropdownBody,
  active = true,
  onChangeData = () => {},
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
          <div className="d-block">
            <Dropdown
              value={value && active ? value : defaultValue}
              setValue={onChange}
              onBlur={onBlur}
              options={data}
              onChangeData={onChangeData}
              {...others}
              classDropdownBody={classDropdownBody}
              className={className}
              error={error}
              active={active}
            />
            {error ? (
              <p className={cn(styles.redLine, classError)}>{error.message}</p>
            ) : (
              <p className={cn(styles.hidden, styles.redLine, classError)}>.</p>
            )}
          </div>
        )}
      />
    </>
  );
}
