import { Controller, useFormContext } from 'react-hook-form';

import cn from 'classnames';
import styles from '../RHFTextInput/RHFTextInput.module.sass';

import InputSelect from '../../InputSelect';

function RHFInputSelect({ name, classError, defaultValue, ...others }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      // defaultValue={[]}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        return (
          <>
            <InputSelect
              value={value || defaultValue}
              setValue={(newValue) => {
                // console.log(`InputSelected : ${newValue}`);
                onChange(newValue);
              }}
              onBlur={onBlur}
              error={error}
              {...others}
            />
            {/* {error ? (
              <p className={cn(styles.redLine, classError)}>{error.message}</p>
            ) : (
              <p className={cn(styles.hidden, styles.redLine, classError)}>.</p>
            )} */}
          </>
        );
      }}
    />
  );
}

export default RHFInputSelect;
