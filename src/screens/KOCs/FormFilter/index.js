import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';

import { RHFCheckbox, RHFLabel } from '../../../components';

import { useSettingsUser } from '../../../hooks/Setting';
import { useQueryString } from '../../../hooks';

export default function FormFilter({ parentFc }) {
  const { queryString, setQueryString } = useQueryString();

  const { userPlatforms, userTiers, userCategories } = useSettingsUser();

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
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleSubmit)}>
        <div className="borderTop borderBottom py-3">
          <RHFLabel
            classLabel="mb-2"
            label="Platform"
            tooltip="Search and filter by Platform"
          />
          {userPlatforms.isSuccess &&
            userPlatforms.data.map((platform) => (
              <RHFCheckbox
                key={platform.id}
                name={platform.id}
                content={platform.name}
              />
            ))}
        </div>

        <div className="borderBottom py-3">
          <RHFLabel
            classLabel="mb-2"
            label="Tier"
            tooltip="Search and filter by Tier"
          />
          {userTiers.isSuccess &&
            userTiers.data.map((tier) => (
              <RHFCheckbox key={tier.id} name={tier.id} content={tier.name} />
            ))}
        </div>

        <div className="borderBottom py-3">
          <RHFLabel
            classLabel="mb-2"
            label="Category"
            tooltip="Search and filter by Tier"
          />
          {userCategories.isSuccess &&
            userCategories.data.map((category) => (
              <RHFCheckbox
                key={category.id}
                name={category.id}
                content={category.name}
              />
            ))}
        </div>

        <Stack direction="horizontal" className="mt-4 justify-content-end">
          <p onClick={onClose} className="button-white">
            Reset
          </p>
          <button className="button ms-2">Apply</button>
        </Stack>
      </form>
    </FormProvider>
  );
}
