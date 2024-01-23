import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Item,
  AsyncButton,
  RHFTextInput,
  RHFDate,
  RHFDropdown,
} from '../../../components';

import { AddLiquidationSchema } from '../../../utils/ValidateSchema';

import useLiquidationForm from '../../../hooks/Form/useLiquidationForm';

import { onEnterPreventDefault, onInvalidSubmit } from '../../../utils/helpers';

export default function LiquidationForm({ title = '' }) {
  // Props from Outlet
  const { onClose } = useOutletContext();

  // ------------------------------ Query Data ------------------------------

  const {
    categoriesQuery,
    statusQuery,
    picsQuery,
    receiversQuery,
    handleSubmit,
    defaultForm,
    isLoading,
  } = useLiquidationForm();

  // ------------------------------ Handle form ---------------------------

  const method = useForm({
    resolver: yupResolver(AddLiquidationSchema),
    defaultValues: defaultForm,
  });

  useEffect(() => method.reset(defaultForm), [defaultForm, method]);

  // ------------------------------ Render --------------------------------
  return (
    <FormProvider {...method}>
      <form
        onSubmit={method.handleSubmit(handleSubmit, onInvalidSubmit)}
        onKeyDown={onEnterPreventDefault}
      >
        <Item
          title={title}
          className="pb-2 borderBottom"
          classTitle="title-red"
        >
          <div className="borderTop borderBottom pt-4 pb-1">
            <RHFTextInput
              name="liquidationName"
              label="Name"
              placeholder="Enter name"
              tooltip="Name is required"
            />
          </div>
          <div className="borderBottom pt-4 pb-0">
            <RHFDate nameDate="fromDate" label="From" />
            <RHFDate nameDate="toDate" label="To" />
          </div>
          <div className="borderBottom pt-4 pb-1">
            <RHFDropdown
              name="category"
              label="Category"
              defaultValue="Select category"
              data={categoriesQuery?.data}
              tooltip="Category is required"
            />
          </div>
          <div className="borderBottom pt-4 pb-1">
            <RHFDropdown
              name="receivers"
              label="Receiver"
              defaultValue="Select receiver"
              data={receiversQuery?.data?.map((item) => item.name)}
              tooltip="Receiver is required"
            />
          </div>
          <div className="borderBottom pt-4 pb-1">
            <RHFDropdown
              name="status"
              label="Status"
              defaultValue="Select status"
              data={statusQuery?.data}
              tooltip="Status is required"
            />
          </div>
          <div className="borderBottom pt-4 pb-4">
            <RHFTextInput
              name="cost"
              label="Cost"
              type="number"
              placeholder="Enter cost"
              tooltip="Cost is required"
            />
          </div>
          <div className="pt-4">
            <RHFDropdown
              name="pic"
              label="P.I.C"
              defaultValue="Select P.I.C"
              data={picsQuery?.data}
              tooltip="P.I.C is required"
            />
          </div>
        </Item>

        <div className="py-4 d-flex justify-content-end">
          <p onClick={onClose} className="button-white me-2">
            Cancel
          </p>
          <AsyncButton
            threeDotsWidth="20"
            threeDotsHeight="20"
            type="submit"
            className="button"
            value="Save"
            notMaxWidth
            loading={isLoading}
          />
        </div>
      </form>
    </FormProvider>
  );
}
