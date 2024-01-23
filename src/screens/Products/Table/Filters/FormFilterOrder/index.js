import React, { useEffect, useState, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import cn from 'classnames';
import styles from './FormFilterOrder.module.sass';
import Schedule from './ScheduleKOC';
import useQueryString from '../../../../../hooks/useQueryString';
import { RHFDate, RHFLabel } from '../../../../../components';

import { dateToUrl } from '../../../../../utils/helpers';

const FormFilterOrder = ({ parentFc }) => {
  const { queryString, setQueryString } = useQueryString();
  const defaultValues = useMemo(() => {
    const defaultValues = {};
    defaultValues.from = queryString.from || '';
    defaultValues.to = queryString.to || '';

    return defaultValues;
  }, [queryString]);

  const method = useForm({ defaultValues });

  const handleApply = (data) => {
    const params = {
      ...queryString,
    };
    if (data.from) {
      params.from = dateToUrl(data.from);
    }
    if (data.to) {
      params.to = dateToUrl(data.to);
    }
    params.page = 1;

    setQueryString(params);
    parentFc(false);
  };
  const handleReset = () => {
    const params = {
      ...queryString,
    };
    delete params.from;
    delete params.to;
    params.page = 1;
    setQueryString(params);
    method.reset();
    parentFc(false);
  };

  return (
    <>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(handleApply)}>
          <div>
            <div>
              <div className="pb-3 pt-4 border-top">
                {/* <RHFLabel
                  classLabel="mb-2"
                  label="From"
                  tooltip="Select the starting date"
                />
                <Schedule
                  name="schedule-start"
                  startDate={startDate}
                  setStartDate={(date) => setStartDate(date)}
                /> */}
                <RHFDate
                  label="From"
                  nameDate="from"
                  tooltip="Select the starting date"
                />
              </div>
              <div className="pb-4 border-bottom">
                {/* <RHFLabel
                  classLabel="mb-2"
                  label="To"
                  tooltip="Select the ending date"
                />
                <Schedule
                  name="schedule-end"
                  startDate={endDate}
                  setStartDate={(date) => setEndDate(date)}
                /> */}
                <RHFDate
                  label="To"
                  nameDate="to"
                  tooltip="Select the ending date"
                />
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
export default FormFilterOrder;
