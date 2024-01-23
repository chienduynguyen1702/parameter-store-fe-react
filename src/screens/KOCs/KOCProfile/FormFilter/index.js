import React, { useMemo } from 'react';
import { Stack } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import moment from 'moment';

import useQueryString from '../../../../hooks/useQueryString';

import { RHFDate, RHFTagInput } from '../../../../components';

export default function FormFilter({ parentFc }) {
  // use QueryString to get URL params and set URL params
  const { queryString, setQueryString } = useQueryString();

  const description = useMemo(() => {
    if (!queryString.description) {
      return [];
    }
    if (!Array.isArray(queryString.description)) {
      return [{ id: 0, text: queryString.description }];
    }
    return queryString.description.map((item, index) => {
      return { id: index, text: item };
    });
  }, [queryString]);

  const defaultValues = useMemo(() => {
    const defaultValues = {};
    defaultValues.from = queryString.from || '';
    defaultValues.to = queryString.to || '';
    defaultValues.description = description || '';

    return defaultValues;
  }, [queryString, description]);

  const method = useForm({ defaultValues });

  const handleReset = () => {
    method.reset();
    const params = { ...queryString };
    delete params.from;
    delete params.to;
    delete params.description;
    setQueryString(params);
    parentFc(false);
  };

  const handleSubmit = (data) => {
    const params = {
      ...queryString,
    };

    if (data.from) {
      params.from = moment(data.from).format('YYYY-MM-DD');
    }

    if (data.to) {
      params.to = moment(data.to).format('YYYY-MM-DD');
    }

    if (data.description) {
      data.description = data.description.map((item) => item.text);
      params.description = data.description;
    }

    if (params.page) params.page = 1;
    setQueryString(params);
    parentFc(false);
  };

  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleSubmit)}>
        <RHFDate label="From" nameDate="from" tooltip="Filter by From date" />
        <RHFDate label="To" nameDate="to" tooltip="Filter by To date" />
        <RHFTagInput
          label="Description"
          name="description"
          notRequiredInSuggestions
        />
        <Stack direction="horizontal">
          <p onClick={handleReset} className="button-white ms-auto me-2">
            Reset
          </p>
          <button className="button">Apply</button>
        </Stack>
      </form>
    </FormProvider>
  );
}
