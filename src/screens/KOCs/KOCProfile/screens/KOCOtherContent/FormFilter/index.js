import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import cn from 'classnames';
import styles from './FormFilter.module.sass';

import { RHFCheckbox, RHFDate } from '../../../../../../components';
import useQueryString from '../../../../../../hooks/useQueryString';
import { dateToUrl } from '../../../../../../utils/helpers';

export default function FormFilter({ parentFc, userPlatforms, userType }) {
  // use QueryString to get URL params and set URL params
  const { queryString, setQueryString } = useQueryString();

  // get from date from URL params
  const from = useMemo(() => {
    if (!queryString.from) {
      return null;
    }
    return new Date(queryString.from);
  }, [queryString.from]);
  // get to date to URL params
  const to = useMemo(() => {
    if (!queryString.to) {
      return null;
    }
    return new Date(queryString.to);
  }, [queryString.to]);

  const settings = useMemo(() => {
    if (!queryString.settings) {
      return [];
    }
    if (!Array.isArray(queryString.settings)) {
      return [queryString.settings];
    }
    return [...queryString.settings];
  }, [queryString.settings]);

  const defaultValues = useMemo(() => {
    const defaultValues = {};
    settings.forEach((setting) => {
      defaultValues[setting] = true;
    });
    defaultValues['from'] = from;
    defaultValues['to'] = to;

    return defaultValues;
  }, [from, settings, to]);

  const method = useForm({ defaultValues });

  const handleReset = () => {
    method.reset();
    const params = {
      ...queryString,
    };

    delete params.settings;
    if (!!params.from) {
      delete params.from;
    }
    if (!!params.to) {
      delete params.to;
    }

    params.page = 1;
    setQueryString(params);
    parentFc(false);
  };

  const handleSubmit = (data) => {
    const { from, to, ...settings } = data;
    const settingsFilter = Object.keys(settings).filter((key) => settings[key]);
    const params = { ...queryString };
    if (!!params.settings) {
      delete params.settings;
    }
    if (!!from) {
      delete params.from;
    }
    if (!!to) {
      delete params.to;
    }

    if (settingsFilter.length > 0) {
      params.settings = settingsFilter;
    }
    if (from) {
      params.from = dateToUrl(from);
    }
    if (to) {
      params.to = dateToUrl(to);
    }
    console.log(params);
    params.page = 1;
    setQueryString(params);
    parentFc(false);
  };

  return (
    <div className={styles.list}>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(handleSubmit)}>
          <div className={cn(styles.item)}>
            <div className={styles.checkboxBorder}>
              <p className={styles.permissions}>Type</p>
              {userType?.isSuccess &&
                userType?.data?.map((tier) => (
                  <RHFCheckbox
                    key={tier.id}
                    name={tier.id}
                    content={tier.name}
                    className={styles.colorText}
                  />
                ))}
            </div>
            <div className={styles.checkboxBorder}>
              <p className={styles.permissions}>Platform</p>
              {userPlatforms?.isSuccess &&
                userPlatforms?.data?.map((platform) => (
                  <RHFCheckbox
                    key={platform.id}
                    name={platform.id}
                    content={platform.name}
                    className={styles.colorText}
                  />
                ))}
            </div>
            <RHFDate
              label="From"
              tooltip="Select the starting date"
              className="borderBottom borderTop pt-3"
              nameDate="from"
            />
            <RHFDate
              label="To"
              tooltip="Select the ending date"
              className="borderBottom mt-3"
              nameDate="to"
            />
          </div>
          <div className={styles.btns}>
            <div
              className={cn('button-stroke btn cursor-pointer', styles.button)}
              onClick={handleReset}
            >
              Reset
            </div>
            <button className={cn('button', styles.button)}>Apply</button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
