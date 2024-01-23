import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './RHFTextInput.module.sass';

import TextInput from '../../TextInput';

RHFTextInput.propTypes = {
  name: PropTypes.string,
};

// classError, classLabel, classInput, className
function RHFTextInput({ name, classError, ...others }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <TextInput
            value={value}
            onChange={onChange}
            error={error}
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
  );
}

export default RHFTextInput;
