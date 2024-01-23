import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import cn from 'classnames';
import styles from './FormFilterKocs.module.sass';

import { Stack } from 'react-bootstrap';
import { RHFCheckbox, RHFLabel } from '../../../../../components';

import { useSettingsUser } from '../../../../../hooks/Setting';
import { useQueryString } from '../../../../../hooks';

export default function FormFilterKocs({ parentFc }) {
  const { queryString, setQueryString } = useQueryString();

  const { userPlatforms, userTiers } = useSettingsUser();

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
                label="Tier"
                tooltip="Search and filter by Tier"
              />
              {userTiers.isSuccess &&
                userTiers.data.map((tier) => (
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
                label="Platform"
                tooltip="Search and filter by Platform"
              />
              {userPlatforms.isSuccess &&
                userPlatforms.data.map((platform) => (
                  <RHFCheckbox
                    key={platform.id}
                    name={platform.id}
                    content={platform.name}
                    className={styles.colorText}
                  />
                ))}
            </div>
          </div>

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
