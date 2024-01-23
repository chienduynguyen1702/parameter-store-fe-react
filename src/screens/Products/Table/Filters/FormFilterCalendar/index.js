import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';

import cn from 'classnames';
import styles from './FormFilterCalendar.module.sass';

import { RHFTextInput } from '../../../../../components';

import useQueryString from '../../../../../hooks/useQueryString';

import { dateToUrl } from '../../../../../utils/helpers';

import { FilterCalendarSchema } from '../../../../../utils/ValidateSchema';

export default function FormFilterCalendar({ parentFc }) {
  // use QueryString to get URL params and set URL params
  const { queryString, setQueryString } = useQueryString();

  // Set default values for form
  const defaultForm = useMemo(() => {
    const params = { ...queryString };
    return {
      year: params.from ? new Date(params.from).getFullYear() : '',
      month: params.from ? new Date(params.from).getMonth() + 1 : '',
    };
  }, [queryString]);

  // Init react-hook-form
  const method = useForm({
    resolver: yupResolver(FilterCalendarSchema),
    defaultValues: defaultForm,
  });

  // Close popup and reset form
  const onClose = () => {
    // Remove settings from URL params
    const params = { ...queryString };
    if (!!params.from) {
      delete params.from;
    }
    if (!!params.to) {
      delete params.to;
    }
    if (!!params.jump) {
      delete params.jump;
    }

    setQueryString(params);
    method.reset();
    parentFc(false);
  };

  // Submit form
  const handleSubmit = (data) => {
    const params = { ...queryString };

    if (!!params.from) {
      delete params.from;
    }
    if (!!params.to) {
      delete params.to;
    }

    params.from = dateToUrl(new Date(data.year, data.month - 1));
    params.to = dateToUrl(new Date(data.year, data.month));
    params.jump = true;

    setQueryString(params);
    parentFc(false);
  };

  return (
    <div className={styles.list}>
      {/* Filter form  */}
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(handleSubmit)}>
          <div className={cn(styles.item)}>
            <div className={styles.checkboxBorder}>
              <RHFTextInput
                label="Year"
                name="year"
                type="number"
                placeholder="2023"
                tooltip="Search and filter by Year"
              />
              <RHFTextInput
                label="Month"
                name="month"
                type="number"
                placeholder="1"
                tooltip="Search and filter by month"
              />
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
            <button className={cn('button', styles.btn)}>Apply</button>
          </Stack>
        </form>
      </FormProvider>
    </div>
  );
}
