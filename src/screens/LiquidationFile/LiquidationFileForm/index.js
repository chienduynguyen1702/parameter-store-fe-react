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
  RHFTagInput,
  RHFSelectVideos,
} from '../../../components';

import { AddLiquidationItemSchema } from '../../../utils/ValidateSchema';

import useLiquidationItemForm from '../../../hooks/Form/useLiquidationItemForm';

import { onEnterPreventDefault, onInvalidSubmit } from '../../../utils/helpers';
import { useQuery } from '@tanstack/react-query';
import { getTikTokContentsByIdKOC } from '../../../services/api';

export default function LiquidationFileForm({ title = '', disabled = false }) {
  // Props from Outlet
  const { onClose } = useOutletContext();

  // ------------------------------ Query Data ------------------------------

  const {
    categoriesQuery,
    statusQuery,
    picsQuery,
    kocsQuery,
    receiversQuery,
    handleSubmit,
    defaultForm,
    isLoading,
  } = useLiquidationItemForm();

  // ------------------------------ Handle form ---------------------------

  const method = useForm({
    resolver: yupResolver(AddLiquidationItemSchema),
    defaultValues: defaultForm,
  });

  useEffect(() => method.reset(defaultForm), [defaultForm, method]);

  const contentsQuery = useQuery({
    queryKey: ['contents'],
    queryFn: () =>
      getTikTokContentsByIdKOC(method.watch('koc')?.[0]?.id, {
        page: 1,
        limit: 1000,
      }),
    enabled: method.watch('koc')?.[0]?.id ? true : false,
    select: (data) =>
      data.data.data?.contents.map((item) => {
        return {
          id: item?.id,
          image: item?.cover_image_url,
          name: item?.title,
        };
      }),
  });

  // ------------------------------ Render --------------------------------
  return (
    <FormProvider {...method}>
      <form
        onSubmit={method.handleSubmit(handleSubmit, onInvalidSubmit)}
        onKeyDown={onEnterPreventDefault}
      >
        <Item
          title={title}
          className={`pb-2 ${!disabled && 'borderBottom'}`}
          classTitle="title-red"
        >
          <div className="borderTop borderBottom pt-4 pb-1">
            <RHFTextInput
              name="liquidationName"
              label="Name"
              placeholder="Enter name"
              tooltip="Name is required"
              disabled={disabled}
            />
          </div>
          <div className="borderBottom pt-4 pb-1">
            <RHFTextInput
              name="description"
              label="Scope of Work"
              placeholder="Enter name"
              tooltip="Name is required"
              disabled={disabled}
            />
          </div>
          <div className="borderBottom pt-4 pb-0">
            <RHFDate nameDate="fromDate" label="From" disabled={disabled} />
            <RHFDate nameDate="toDate" label="To" disabled={disabled} />
          </div>
          <div className="borderBottom pt-4 pb-1">
            {kocsQuery.isSuccess ? (
              <RHFTagInput
                name="koc"
                label="KOC"
                placeholder="Enter 1 KOC"
                tooltip="KOC is required"
                limit={1}
                suggestions={kocsQuery?.data}
                disabled={disabled}
              />
            ) : (
              <RHFTagInput
                name="koc"
                label="KOC"
                placeholder="Enter 1 KOC"
                tooltip="KOC is required"
                limit={1}
                notRequiredInSuggestions
                disabled={disabled}
              />
            )}
          </div>
          <div className="borderBottom pt-4 pb-1">
            {receiversQuery.isSuccess ? (
              <RHFTagInput
                name="receivers"
                label="Receiver"
                placeholder="Enter 1 Receiver"
                tooltip="Receiver is required"
                limit={4}
                suggestions={receiversQuery?.data}
                disabled={disabled}
              />
            ) : (
              <RHFTagInput
                name="receivers"
                label="Receiver"
                placeholder="Select receiver"
                tooltip="Receiver is required"
                limit={1}
                notRequiredInSuggestions
                disabled={disabled}
              />
            )}
          </div>
          <div className="borderBottom pt-4 pb-2">
            {contentsQuery.isSuccess ? (
              <RHFSelectVideos
                name="videos"
                label="Videos"
                title="Select Video"
                tooltip="Video is required"
                options={contentsQuery?.data}
                smallCheckbox
                disabled={disabled}
              />
            ) : (
              <RHFSelectVideos
                name="videos"
                label="Videos"
                title="Select Video"
                tooltip="Video is required"
                options={[]}
                smallCheckbox
                disabled={disabled}
              />
            )}
          </div>
          <div className="borderBottom pt-4 pb-1">
            <RHFDropdown
              name="category"
              label="Category"
              defaultValue="Select category"
              data={categoriesQuery?.data?.map((item) => item.name)}
              tooltip="Category is required"
              disabled={disabled}
            />
          </div>

          <div className="borderBottom pt-4 pb-1">
            <RHFDropdown
              name="status"
              label="Status"
              defaultValue="Select status"
              data={statusQuery?.data?.map((item) => item.name)}
              tooltip="Status is required"
              disabled={disabled}
            />
          </div>
          <div className={`borderBottom pt-4 pb-4`}>
            <RHFTextInput
              name="cost"
              label="Cost"
              type="number"
              placeholder="Enter cost"
              tooltip="Cost is required"
              disabled={disabled}
            />
          </div>
          <div className="pt-4">
            <RHFDropdown
              name="pic"
              label="P.I.C"
              defaultValue="Select P.I.C"
              data={picsQuery?.data?.map((item) => item.name)}
              tooltip="P.I.C is required"
              disabled={disabled}
            />
          </div>
        </Item>

        {!disabled && (
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
        )}
      </form>
    </FormProvider>
  );
}
