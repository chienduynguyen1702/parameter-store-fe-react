import { Controller, useFormContext } from 'react-hook-form';

import cn from 'classnames';
import styles from '../RHFTextInput/RHFTextInput.module.sass';

import TagInput from '../../TagInput';

function RHFTagInput({ name, classError, ...others }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        return (
          <>
            <TagInput
              value={value}
              setValue={onChange}
              onBlur={onBlur}
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

export default RHFTagInput;
