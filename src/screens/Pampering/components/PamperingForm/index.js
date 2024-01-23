import React, { useEffect, useState, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import cn from 'classnames';

import {
  RHFTextInput,
  AsyncButton,
  RHFDropdown,
  Item,
  RHFDate,
  // RHFImage,
  RHFFile,
} from '../../../../components';

import { AddPamperingsSchema } from '../../../../utils/ValidateSchema';

import { onInvalidSubmit } from '../../../../utils/helpers';

import usePamperingForm from './usePamperingForm';

const PamperingForm = ({ title = '' }) => {
  // Props from Outlet
  const { onClose } = useOutletContext();

  const {
    categoriesQuery,
    statusQuery,
    usersQuery,
    handleSubmit,
    defaultForm,
    pamperingQuery,
    isLoading,
  } = usePamperingForm();

  const method = useForm({
    resolver: yupResolver(AddPamperingsSchema),
    defaultValues: defaultForm,
  });

  useEffect(() => {
    method.reset(defaultForm);
    pamperingQuery?.isSuccess && setEvidence(defaultForm?.evidence);
  }, [
    defaultForm,
    method,
    pamperingQuery?.evidence,
    pamperingQuery?.isSuccess,
  ]);

  const [evidence, setEvidence] = useState(pamperingQuery?.evidence_url);

  useEffect(() => {
    method.reset(defaultForm);

    // Add cleanup function to reset evidence state when component unmounts
    return () => {
      setEvidence(null); // Reset the state when the component unmounts.
    };
  }, [defaultForm, method]);

  return (
    <div>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(handleSubmit, onInvalidSubmit)}>
          <Item
            title={title}
            className="border-bottom mb-3"
            classTitle="title-green"
          >
            <RHFTextInput
              className="border-top pt-3"
              name="name"
              label="Name"
              placeholder="Enter name"
              tooltip="Name is required"
            />
            <RHFDropdown
              name="category"
              label="Category"
              defaultValue="Select category"
              data={categoriesQuery?.data?.map((item) => item?.name)}
              tooltip="Category is required"
            />
            <RHFDate
              nameDate="date"
              label="Date"
              tooltip="Date is required"
              className="mb-1"
            />
            <RHFTextInput
              name="cost"
              label="Cost"
              type="number"
              placeholder="Enter cost"
              tooltip="Cost is required"
            />
            <RHFDropdown
              name="pic"
              label="P.I.C"
              defaultValue="Select P.I.C"
              data={usersQuery?.data?.map((item) => item?.name)}
              tooltip="P.I.C is required"
            />
            <RHFDropdown
              name="status"
              label="Status"
              defaultValue="Select status"
              data={statusQuery?.data?.map((item) => item?.name)}
              tooltip="Status is required"
            />
            <RHFFile
              // className={styles.field}
              name="evidence"
              title="Browser from your device"
              label="Upload Evidence"
              tooltip="Upload Evidence is required"
              imgUrl={evidence}
              setImage={setEvidence}
            />
          </Item>

          <div className="d-flex justify-content-end">
            <p onClick={onClose} className={cn('button-white me-3')}>
              Cancel
            </p>
            <AsyncButton
              threeDotsWidth="20"
              threeDotsHeight="20"
              type="submit"
              className={cn('button')}
              value="Save"
              notMaxWidth
              loading={isLoading}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default PamperingForm;
