import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';

import cn from 'classnames';
import styles from './FormFilter.module.sass';

import { RHFTagInput } from '../../../../components';

import useQueryString from '../../../../hooks/useQueryString';
import { useSettingsProduct } from '../../../../hooks/Setting';

export default function FormFilter({ parentFc }) {
  // use QueryString to get URL params and set URL params
  const { queryString, setQueryString } = useQueryString();
  const { productTypes, productCategories } = useSettingsProduct();

  const method = useForm({});

  const onClose = () => {
    method.reset();
    // Remove settings from URL params
    const params = { ...queryString };
    if (!!params.settings) {
      delete params.settings;
    }
    setQueryString(params);
    parentFc(false);
  };

  const handleSubmit = (data) => {
    const params = { ...queryString };
    if (!!params.settings) {
      delete params.settings;
    }
    const categories = data.category.map((key) => key.id);
    const types = data.type.map((key) => key.id);

    const settings = [...categories, ...types];
    if (settings.length > 0) {
      params.settings = settings;
    }
    params.page = 1;
    setQueryString(params);
    parentFc(false);
  };

  useEffect(() => {
    if (queryString?.settings) {
      if (typeof queryString?.settings === 'object') {
        const settings = [...queryString?.settings];
        const category = productCategories?.data?.filter(
          (item) =>
            settings.some((setting) => setting === item.id) &&
            item.type === 'product-category',
        );
        const type = productTypes?.data?.filter(
          (item) =>
            settings.some((setting) => setting === item.id) &&
            item.type === 'product-type',
        );
        const data = {
          category: category?.length
            ? category.map((item) => ({ id: item.id, text: item.name }))
            : '',
          type: type?.length
            ? type.map((item) => ({ id: item.id, text: item.name }))
            : '',
        };
        method.reset(data);
      } else if (typeof queryString?.settings === 'string') {
        const category = productCategories?.data?.find(
          (item) => item?.id === queryString?.settings,
        );
        const type = productTypes?.data?.find(
          (item) => item?.id === queryString?.settings,
        );
        const data = {
          category: category ? [{ id: category.id, text: category.name }] : '',
          type: type ? [{ id: type.id, text: type.name }] : '',
        };
        method.reset(data);
      }
    }
  }, [queryString?.settings]);

  return (
    <div>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(handleSubmit)}>
          <RHFTagInput
            label="Category"
            name="category"
            placeholder="Select more"
            tooltip="Search and filter by Category"
            suggestions={productCategories?.data?.map((item) => ({
              id: item.id + '',
              text: item.name,
            }))}
          />
          <RHFTagInput
            label="Type"
            name="type"
            placeholder="Select more"
            tooltip="Search and filter by Type"
            suggestions={productTypes?.data?.map((item) => ({
              id: item.id + '',
              text: item.name,
            }))}
          />
          <Stack direction="horizontal">
            <p onClick={onClose} className={cn('button-white', styles.btn)}>
              Reset
            </p>
            <button className={cn('button ms-auto', styles.btn)}>Apply</button>
          </Stack>
        </form>
      </FormProvider>
    </div>
  );
}
