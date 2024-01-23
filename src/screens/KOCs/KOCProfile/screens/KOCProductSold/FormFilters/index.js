import React, { useCallback, useMemo } from 'react';
import { Stack } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import moment from 'moment';

import useQueryString from '../../../../../../hooks/useQueryString';

import { RHFDate, RHFTagInput } from '../../../../../../components';
import { useQuery } from '@tanstack/react-query';
import { getListSettings } from '../../../../../../services/api';

export default function FormFilters({ parentFc, suggestionProduct }) {
  // use QueryString to get URL params and set URL params
  const { queryString, setQueryString } = useQueryString();
  const parseData = useCallback((data) => {
    const settings = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        color: item.color,
        type: item.type,
      };
    });
    return settings;
  }, []);
  const productCategories = useQuery({
    queryKey: ['product-category'],
    queryFn: () => getListSettings({ type: 'product-category' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
  });

  const defaultValues = useMemo(() => {
    const defaultValues = {};
    defaultValues.from = queryString.from || '';
    defaultValues.to = queryString.to || '';
    // const categoryFilter = productCategories?.data?.filter((item) => {
    //   return Number(item?.id) === Number(queryString.category)
    // })
    const categoryFilter = productCategories?.data?.filter((item) => {
      return queryString.category.includes(item.id);
    });
    defaultValues.category =
      typeof queryString?.category === 'string'
        ? [
            {
              id: categoryFilter ? categoryFilter[0]?.id : 0,
              text: categoryFilter ? categoryFilter[0]?.name : '',
            },
          ]
        : categoryFilter?.map?.((item) => {
            return {
              id: item.id || '',
              text: item.name || '',
            };
          });

    // defaultValues.product =
    //   typeof queryString?.product === 'string'
    //     ? [
    //         {
    //           id: queryString?.product,
    //           text: queryString?.product,
    //         },
    //       ]
    //     : queryString?.product?.map?.((item) => {
    //         return {
    //           id: item,
    //           text: item,
    //         };
    //       });
    return defaultValues;
  }, [
    productCategories?.data,
    queryString.category,
    queryString.from,
    queryString?.product,
    queryString.to,
  ]);

  const method = useForm({ defaultValues });

  const handleReset = () => {
    method.reset();
    const params = { ...queryString };
    delete params.from;
    delete params.to;
    delete params.category;
    delete params.product;
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
    if (data.category) {
      params.category = data.category?.map((item) => item?.id);
    }

    if (data.product) {
      params.product = data?.product?.map((item) => item?.id);
    }

    params.page = 1;
    setQueryString(params);
    parentFc(false);
  };

  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleSubmit)}>
        <RHFDate label="From" nameDate="from" tooltip="Filter by From date" />
        <RHFDate label="To" nameDate="to" tooltip="Filter by To date" />
        <RHFTagInput
          label="Product Category"
          name="category"
          suggestions={productCategories?.data?.map((item) => ({
            id: item.id,
            text: item.name,
          }))}
        />
        <RHFTagInput
          label="Product"
          name="product"
          suggestions={suggestionProduct}
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
