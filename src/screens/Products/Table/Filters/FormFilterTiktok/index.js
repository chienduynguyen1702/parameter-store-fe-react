import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import cn from 'classnames';
import styles from './FormFilterTiktok.module.sass';

import { RHFCheckbox, RHFDate, RHFLabel } from '../../../../../components';

import { dateToUrl } from '../../../../../utils/helpers';

import { useSettingsTask } from '../../../../../hooks/Setting';
import { useQueryString } from '../../../../../hooks';

const FormFilterTiktok = ({ parentFc }) => {
  const { queryString, setQueryString } = useQueryString();

  const { taskTypes } = useSettingsTask();

  // get settings from URL params
  const settings = useMemo(() => {
    if (!queryString.settings) {
      return [];
    }
    if (!Array.isArray(queryString.settings)) {
      return [queryString.settings];
    }
    return [...queryString.settings];
  }, [queryString.settings]);

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

  const defaultValues = useMemo(() => {
    const defaultValues = {};

    // Handle default settings
    const idSettings = [7, 8, 9, 10, 13, 16, 18, 19, 20, 21, 22];
    idSettings.forEach((setting) => {
      defaultValues[setting] = false;
    });
    settings.forEach((setting) => {
      defaultValues[setting] = true;
    });

    defaultValues['settings'] = settings;
    defaultValues['from'] = from;
    defaultValues['to'] = to;

    return defaultValues;
  }, [settings, from, to]);

  const method = useForm({ defaultValues });

  const handleApply = (data) => {
    const params = {
      ...queryString,
    };
    if (!!params.settings) {
      delete params.settings;
    }
    // Set params for date from
    if (data.from) {
      params.from = dateToUrl(data.from);
    } else delete params.from;

    // Set params for date to
    if (data.to) {
      params.to = dateToUrl(data.to);
    } else delete params.to;
    params.page = 1;

    const settings = Object.keys(data)
      .filter((key) => key !== 'from' && key !== 'to')
      .filter((key) => data[key]);

    if (settings.length > 0) {
      params.settings = settings;
    }

    setQueryString(params);

    parentFc(false);
  };

  const handleReset = () => {
    method.reset();
    const params = {
      ...queryString,
    };

    if (!!params.settings) {
      delete params.settings;
    }
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

  return (
    <>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(handleApply)}>
          <div>
            <div>
              <div className="pb-3 pt-4 border-top">
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
              <div className={styles.checkboxBorder}>
                <RHFLabel label="Types" tooltip="Search and filter by Types" />
                {taskTypes.isSuccess &&
                  taskTypes.data.map((type) => (
                    <RHFCheckbox
                      key={type.id}
                      name={type.id}
                      content={type.name}
                      className={styles.colorText}
                    />
                  ))}
              </div>
              <div className={styles.btns}>
                <button
                  className={cn('button-stroke', styles.button)}
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button className={cn('button', styles.button)}>Apply</button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default FormFilterTiktok;
