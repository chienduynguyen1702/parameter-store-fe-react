import { Controller, useFormContext } from 'react-hook-form';

import ColorInput from '../../ColorInput';

function RHFColorInput({ name, classHeader, label, className, ...others }) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <ColorInput
          value={value}
          setValue={onChange}
          onBlur={onBlur}
          classHeader={classHeader}
          className={className}
          label={label}
          {...others}
        />
      )}
    />
  );
}

export default RHFColorInput;
