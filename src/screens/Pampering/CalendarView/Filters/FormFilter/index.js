import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { Stack } from 'react-bootstrap';

import cn from 'classnames';
import styles from './FormFilter.module.sass';

import { MonthYearDatePicker } from '../../../../../components';
import { useListPamperingCalendar } from '../../../../../hooks/Data';
import { useQueryString } from '../../../../../hooks';

export default function FormFilter({ parentFc }) {
  // use QueryString to get URL params and set URL params
  const { queryString, setQueryString } = useQueryString();

  // getWeekBoundariesForMonth
  const { getWeekBoundariesForMonth } = useListPamperingCalendar();

  const [date, setDate] = useState(null);

  // Set default values for form
  const defaultForm = useMemo(() => {
    const params = { ...queryString };
    const startDate = moment(params.from); // Set your start date
    const endDate = moment(params.to); // Set your end date

    // Calculate the midpoint (center) date
    const midpointDate = startDate
      .clone()
      .add(endDate.diff(startDate) / 2, 'milliseconds');
    return {
      year: params.from ? midpointDate.year() : '',
      month: params.from ? midpointDate.month() + 1 : '',
    };
  }, [queryString]);

  const onClose = () => {
    const params = { ...queryString };
    delete params.from;
    delete params.to;
    setQueryString(params);
    parentFc(false);
  };

  const handleSubmit = () => {
    const newDate = getWeekBoundariesForMonth(`${date.year}-${date.month}-01`);
    const params = { ...queryString, ...newDate };
    setQueryString(params);
    parentFc(false);
  };

  return (
    <div className={styles.list}>
      {/* Filter  */}
      <div className={cn(styles.item)}>
        <div className={styles.checkboxBorder}>
          <MonthYearDatePicker defaultForm={defaultForm} setDate={setDate} />
        </div>
      </div>

      <Stack direction="horizontal">
        {/* Button reset  */}
        <p
          onClick={onClose}
          className={cn('button-white ms-auto me-2', styles.btn)}
        >
          Reset
        </p>
        {/* Button apply  */}
        <button
          className={cn('button', styles.btn)}
          onClick={() => handleSubmit()}
        >
          Apply
        </button>
      </Stack>
    </div>
  );
}
