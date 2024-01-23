import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import cn from 'classnames';
import styles from './FormFilterDefault.module.sass';

import { Stack } from 'react-bootstrap';
import { RHFCheckbox, RHFLabel } from '../../../../../components';

import { useSettingsProduct } from '../../../../../hooks/Setting';
import { useQueryString } from '../../../../../hooks';

export default function FormFilterDefault({ parentFc }) {
  // use QueryString to get URL params and set URL params
  const { queryString, setQueryString } = useQueryString();

  const { productTypes, productCategories } = useSettingsProduct();

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
    return defaultValues;
  }, [settings]);

  const method = useForm({ defaultValues });

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
    const settings = Object.keys(data).filter((key) => data[key]);
    if (settings.length > 0) {
      params.settings = settings;
    }
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
              <RHFLabel
                classLabel={styles.permissions}
                label="Category"
                tooltip="Search and filter by Category"
              />
              {productCategories.isSuccess &&
                productCategories.data.map((tier) => (
                  <RHFCheckbox
                    key={tier.id}
                    name={tier.id}
                    content={tier.name}
                    className={styles.colorText}
                  />
                ))}
            </div>
            <div className={styles.checkboxBorder}>
              <RHFLabel
                classLabel={styles.permissions}
                label="Type"
                tooltip="Search and filter by Type"
              />
              {productTypes.isSuccess &&
                productTypes.data.map((platform) => (
                  <RHFCheckbox
                    key={platform.id}
                    name={platform.id}
                    content={platform.name}
                    className={styles.colorText}
                  />
                ))}
            </div>
          </div>

          <Stack direction="horizontal" className="mt-4 justify-content-end">
            <p onClick={onClose} className={cn('button-white', styles.btn)}>
              Reset
            </p>
            <button className={cn('button ms-2', styles.btn)}>Apply</button>
          </Stack>
        </form>
      </FormProvider>
    </div>
  );
}
