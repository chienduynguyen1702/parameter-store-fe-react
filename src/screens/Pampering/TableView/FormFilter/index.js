import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import moment from 'moment';

import cn from 'classnames';
import styles from './FormFilter.module.sass';

import { RHFCheckbox, RHFDate, RHFLabel } from '../../../../components';

import useQueryString from '../../../../hooks/useQueryString';

import { FilterCalendarSchema } from '../../../../utils/ValidateSchema';
import { useSettingsPampering } from '../../../../hooks/Setting';

export default function FormFilter({ parentFc }) {
  // use QueryString to get URL params and set URL params
  const { queryString, setQueryString } = useQueryString();

  const { pamperingCategories, pamperingPICs, pamperingStatus } =
    useSettingsPampering();

  // get Settings from URL params
  const settings = useMemo(() => {
    if (!queryString.settings) {
      return [];
    }
    if (!Array.isArray(queryString.settings)) {
      return [queryString.settings];
    }
    return [...queryString.settings];
  }, [queryString.settings]);

  // get from and to from URL params
  const from = useMemo(() => {
    if (!queryString.from) {
      return '';
    }
    return queryString.from;
  }, [queryString.from]);

  const to = useMemo(() => {
    if (!queryString.to) {
      return '';
    }
    return queryString.to;
  }, [queryString.to]);

  // Set default values for form
  const defaultForm = useMemo(() => {
    const defaultValues = {};

    if (from !== '') {
      defaultValues.from = from;
    }

    if (to !== '') {
      defaultValues.to = to;
    }

    settings.forEach((setting) => {
      defaultValues[setting] = true;
    });

    return defaultValues;
  }, [settings, from, to]);

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

    if (!!params.settings) {
      delete params.settings;
    }

    params.page = 1;
    setQueryString(params);
    method.reset();
    parentFc(false);
  };

  // Submit form
  const handleSubmit = (data) => {
    if (data.from && data.to && data.from > data.to) {
      toast.error(`Please select the date again.`);
      return;
    }
    const params = { ...queryString };

    if (!!params.pic) delete params.pic;
    if (!!params.status) delete params.status;
    if (!!params.category) delete params.pic;

    // Set params for date from
    if (data.from) {
      params.from = moment(data.from).format('YYYY-MM-DD');
    }

    // Set params for date to
    if (data.to) {
      params.to = moment(data.to).format('YYYY-MM-DD');
    }

    // set params for settings
    const settings = Object.keys(data)
      .filter(
        (key) =>
          key !== 'from' && key !== 'to' && key !== 'page' && key !== 'limit',
      )
      .filter((key) => data[key]);

    if (settings.length > 0) {
      params.settings = settings;
    }

    params.page = 1;

    setQueryString(params);
    parentFc(false);
  };

  return (
    <div className={styles.list}>
      {/* Filter form  */}
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(handleSubmit)}>
          <div className={cn(styles.item, 'mb-4')}>
            <div className={styles.checkboxBorder}>
              <RHFLabel
                label="Category"
                tooltip="Search and filter by Category"
              />
              {pamperingCategories.isSuccess &&
                pamperingCategories?.data?.map((category) => (
                  <RHFCheckbox
                    key={category.id}
                    name={category.id}
                    content={category.name}
                    className={'text-dark'}
                    defaultValue={defaultForm?.settings?.includes(category.id)}
                  />
                ))}
            </div>

            <div className={styles.checkboxBorder}>
              <RHFLabel label="Status" tooltip="Search and filter by status" />
              {pamperingStatus.isSuccess &&
                pamperingStatus.data.map((status) => (
                  <RHFCheckbox
                    key={status.id}
                    name={status.id}
                    content={status.name}
                    className={'text-dark'}
                    defaultValue={defaultForm?.settings?.includes(status.id)}
                  />
                ))}
            </div>

            <div className={styles.checkboxBorder}>
              <RHFLabel label="P.I.C" tooltip="Search and filter by P.I.C" />
              {pamperingPICs.isSuccess &&
                pamperingPICs.data.map((pic) => (
                  <RHFCheckbox
                    key={pic.id}
                    name={pic.id}
                    content={pic.name}
                    className={'text-dark'}
                    defaultValue={defaultForm?.settings?.includes(pic.id)}
                  />
                ))}
            </div>

            <RHFDate
              label="From"
              tooltip="Select the starting date"
              className="borderTop pt-3"
              nameDate="from"
            />
            <RHFDate
              label="To"
              tooltip="Select the ending date"
              className="borderBottom mt-3"
              nameDate="to"
            />
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
