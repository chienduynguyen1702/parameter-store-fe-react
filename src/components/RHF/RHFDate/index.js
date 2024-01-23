import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from 'react-datepicker';

import styles from './RHFDate.module.sass';
import cn from 'classnames';

import Item from './Item';
import moment from 'moment/moment';
import Tooltip from '../../Tooltip';

const RHFDate = ({
  nameDate,
  className,
  classLabel,
  classInput,
  classError,
  label = 'Label',
  place = 'right',
  tooltip = 'This is tooltip',
  disabled = false,
  ...others
}) => {
  const [visibleDate, setVisibleDate] = useState(false);

  const { control } = useFormContext();

  return (
    <div className={className}>
      <Controller
        name={nameDate}
        control={control}
        defaultValue=""
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          const onChangeDate = (e) => {
            // if (disabled) return;
            onChange(e);
          };
          return (
            <>
              <div className={cn(classLabel, styles.label)}>
                {label}{' '}
                <Tooltip
                  className={cn(error ? styles.tooltipError : styles.tooltip)}
                  title={tooltip}
                  icon="info"
                  place={place}
                  error={true}
                />
              </div>
              <Item
                className="mb-1"
                category="Date"
                icon="calendar"
                value={value && moment(value).format('MMMM DD, yyyy')}
                visible={visibleDate}
                setVisible={setVisibleDate}
              >
                <div className={styles.date}>
                  <DatePicker
                    selected={value ? new Date(value) : null}
                    onChange={(e) => onChangeDate(e)}
                    dateFormatCalendar={'MMMM yyyy'}
                    inline
                    {...others}
                  />

                  <div>
                    <p
                      className={cn('button-stroke button-small me-2')}
                      onClick={() => {
                        onChange(null);
                      }}
                    >
                      Clear
                    </p>
                    <p
                      className={cn('button-small')}
                      onClick={() => setVisibleDate(false)}
                    >
                      Save
                    </p>
                  </div>
                </div>
              </Item>
              {error ? (
                <p className={cn(styles.redLine, classError)}>
                  {error.message}
                </p>
              ) : (
                <p className={cn(styles.hidden, styles.redLine, classError)}>
                  .
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default RHFDate;
