import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import Checkbox from '../../Checkbox';

function RHFCheckbox({ name, content, defaultValue = false, ...others }) {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            content={content}
            value={value ?? defaultValue}
            onChange={onChange}
            {...others}
          />
        )}
      />
    </>
  );
}

export default RHFCheckbox;
