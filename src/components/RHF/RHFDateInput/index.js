import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './RHFDateInput.module.sass';

import ReactDatePicker from 'react-datepicker';
import Tooltip from '../../Tooltip';

RHFDateInput.propTypes = {
  name: PropTypes.string,
};

// classError, classLabel, classInput, className
function RHFDateInput({
  name,
  label,
  tooltip,
  place = 'right',
  classError,
  placeholderText,
  ...others
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <div>
            <div className="mb-2">
              <span className={cn('me-1', styles.label)}>{label}</span>
              {tooltip && (
                <Tooltip
                  className={cn(error ? styles.tooltipError : styles.tooltip)}
                  title={tooltip}
                  icon="info"
                  place={place ? place : 'right'}
                  error={true}
                />
              )}
            </div>
            <ReactDatePicker
              selected={value}
              onChange={onChange}
              className={styles.userDatePicker}
              dateFormatCalendar={'MMMM yyyy'}
              placeholderText={placeholderText || ''}
            />
          </div>
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

export default RHFDateInput;
