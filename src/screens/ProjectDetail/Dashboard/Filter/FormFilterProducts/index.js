import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';
import { toast } from 'react-toastify';

import {
  BorderBottomOuter,
  RHFTagInput,
  RHFDate,
} from '../../../../components';

import useQueryString from '../../../../hooks/useQueryString';

import { dateToUrl } from '../../../../utils/helpers';

import useListProducts from '../../../../hooks/Suggestion/useListProducts';

export default function FormFilter({ parentFc }) {
  const { queryString, setQueryString } = useQueryString();
  const defaultValues = useMemo(() => {
    const now = new Date();
    return {
      from: new Date(now.getFullYear(), 0, 1),
      to: new Date(),
      products:
        typeof queryString?.products === 'string'
          ? [
              {
                id: '0',
                text: queryString?.products,
              },
            ]
          : queryString?.products?.map?.((item, index) => {
              return {
                id: index + '',
                text: item,
              };
            }),
    };
  }, [queryString]);

  const method = useForm({ defaultValues });
  const onClose = () => {
    method.reset();
    const params = { ...queryString };
    if (!!params.from) {
      delete params.from;
    }
    if (!!params.to) {
      delete params.to;
    }
    if (!!params.products) {
      delete params.products;
    }
    setQueryString(params);
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
    const products = data.products?.map((item) => item.text);
    if (products?.length > 0) {
      params.products = products;
    }
    setQueryString(params);
    parentFc(false);
  };
  const { listProducts } = useListProducts();
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
        <BorderBottomOuter>
          <RHFTagInput
            label="Product"
            name="products"
            suggestions={listProducts?.data?.map((item) => {
              return {
                id: item.id,
                text: item.name,
              };
            })}
            tooltip="Search and filter by Product"
          />
        </BorderBottomOuter>
        <Stack direction="horizontal" className="mt-4">
          <p onClick={onClose} className={'button-white ms-auto'}>
            Reset
          </p>
          <button className={'button ms-3'}>Apply</button>
        </Stack>
      </form>
    </FormProvider>
  );
}
