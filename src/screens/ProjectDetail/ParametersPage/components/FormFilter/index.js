import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';

import {
  RHFCheckbox,
  RHFInputSelect,
  RHFLabel,
} from '../../../../../components';

import { useQueryString } from '../../../../../hooks';

import { STAGES } from '../../../../../hooks/mocks/stages';
import { ENVIRONMENTS } from '../../../../../hooks/mocks/environments';
import { VERSIONS } from '../../../../../hooks/mocks/versions';

export default function FormFilter({ parentFc }) {
  const { queryString, setQueryString } = useQueryString();

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
            label="Stages"
            tooltip="Search and filter by Stages"
          />
          {STAGES.map((platform) => (
            <RHFCheckbox
              key={platform.id}
              name={platform.name}
              content={platform.name}
            />
          ))}
        </div>

        <div className="borderBottom py-3">
          <RHFLabel
            classLabel="mb-2"
            label="Environments"
            tooltip="Search and filter by Environments"
          />
          {ENVIRONMENTS.map((tier) => (
            <RHFCheckbox key={tier.id} name={tier.name} content={tier.name} />
          ))}
        </div>

        <div className="borderBottom py-3">
          <RHFInputSelect
            label="Version"
            tooltip="Filter by Version"
            name="version"
            suggestions={VERSIONS.map((version) => ({
              label: version.name,
              value: version.name,
            }))}
          />
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
