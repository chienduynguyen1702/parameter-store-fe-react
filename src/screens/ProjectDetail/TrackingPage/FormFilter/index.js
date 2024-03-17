import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';
import { toast } from 'react-toastify';
import moment from 'moment';

import cn from 'classnames';

import { BorderBottomOuter, RHFDate } from '../../../../components';

import useQueryString from '../../../../hooks/useQueryString';
import { dateToUrl } from '../../../../utils/helpers';

export default function FormFilter({ parentFc }) {
  const { queryString, setQueryString } = useQueryString();
  const defaultValues = useMemo(() => {
    return {
      from: queryString.from ? moment(queryString.from).toDate() : null,
      to: queryString.to ? moment(queryString.to).toDate() : null,
    };
  }, [queryString]);

  const method = useForm({ defaultValues });

  const onClose = () => {
    method.reset();
    setQueryString(({ from, to, ...params }) => params);
    parentFc(false);
  };

  const handleSubmit = (data) => {
    if (data.from && data.to && data.from > data.to) {
      toast.error(`Please select the date again.`);
      return;
    }
    const params = { ...queryString };
    if (data.from) {
      delete params.from;
      params.from = dateToUrl(data.from);
    }
    if (data.to) {
      delete params.to;
      params.to = dateToUrl(data.to);
    }
    setQueryString(params);
    parentFc(false);
  };

  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleSubmit)}>
        <BorderBottomOuter>
          <RHFDate
            nameDate="from"
            label="From"
            tooltip="Select the starting date"
          />
          <RHFDate nameDate="to" label="To" tooltip="Select the ending date" />
        </BorderBottomOuter>
        <Stack direction="horizontal" className="mt-4">
          <p onClick={onClose} className={cn('button-white ms-auto')}>
            Reset
          </p>
          <button type="submit" className={cn('button ms-3')}>
            Apply
          </button>
        </Stack>
      </form>
    </FormProvider>
  );
}
