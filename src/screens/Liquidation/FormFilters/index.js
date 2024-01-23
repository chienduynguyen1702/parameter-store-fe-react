import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';

import {
  RHFCheckbox,
  RHFDate,
  RHFTagInput,
  RHFLabel,
} from '../../../components';

import useLiquidationSettings from './useLiquidationFilters';

export default function FormFilters({ parentFc }) {
  const {
    liquidationCategory,
    listReceivers,
    liquidationPIC,
    liquidationStatus,
    handleSubmit,
    defaultValues,
    onClose,
  } = useLiquidationSettings({ parentFc });

  const method = useForm({ defaultValues });

  return (
    <div>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(handleSubmit)}>
          <div>
            {/* Category */}
            <div className="borderBottom borderTop pt-4 pb-3">
              <RHFLabel
                label="Category"
                tooltip="Search and filter by Category"
              />
              {liquidationCategory.isSuccess &&
                liquidationCategory.data.map((platform) => (
                  <RHFCheckbox
                    key={platform.id}
                    name={platform.id}
                    content={platform.name}
                    className="colorN4"
                  />
                ))}
            </div>
            {/* Receiver */}
            <div className="borderBottom pt-4 pb-3">
              <RHFTagInput
                label="Receiver"
                name="receivers"
                suggestions={listReceivers?.data}
                notRequiredInSuggestions
                tooltip="Search and filter by Receiver"
              />
            </div>
            {/* P.I.C */}
            <div className="borderBottom pt-4 pb-3">
              <RHFLabel label="P.I.C" tooltip="Search and filter by P.I.C" />
              {liquidationPIC.isSuccess &&
                liquidationPIC.data.map((tier) => (
                  <RHFCheckbox
                    key={tier.id}
                    name={tier.id}
                    content={tier.name}
                    className="colorN4"
                  />
                ))}
            </div>
            {/* Status */}
            <div className="borderBottom pt-4 pb-3">
              <RHFLabel label="Status" tooltip="Search and filter by Status" />
              {liquidationStatus.isSuccess &&
                liquidationStatus.data.map((category) => (
                  <RHFCheckbox
                    key={category.id}
                    name={category.id}
                    content={category.name}
                    className="colorN4"
                  />
                ))}
            </div>
            {/* Date */}
            <div className="pt-4">
              <RHFDate
                nameDate="from"
                label="From"
                tooltip="Select the starting date"
              />
              <RHFDate
                nameDate="to"
                label="To"
                tooltip="Select the ending date"
              />
            </div>
          </div>

          <Stack direction="horizontal">
            <p
              onClick={() => {
                method.reset();
                onClose();
              }}
              className="button-white ms-auto me-2"
            >
              Reset
            </p>
            <button className="button">Apply</button>
          </Stack>
        </form>
      </FormProvider>
    </div>
  );
}
