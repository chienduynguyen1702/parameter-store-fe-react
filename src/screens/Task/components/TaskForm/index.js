import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import cn from 'classnames';
import styles from './TaskForm.module.sass';

import {
  RHFTextInput,
  RHFTagInput,
  AsyncButton,
  RHFDropdown,
  Item,
  RHFDateAndTime,
} from '../../../../components';

import { AddTasksSchema } from '../../../../utils/ValidateSchema';

import { onInvalidSubmit } from '../../../../utils/helpers';

import useTaskForm from './useTaskForm';

const TaskForm = ({ title = '' }) => {
  // Props from Outlet
  const { onClose } = useOutletContext();

  const {
    platformsQuery,
    typesQuery,
    statusQuery,
    usersQuery,
    productsQuery,
    handleSubmit,
    defaultForm,
    isLoading,
  } = useTaskForm();

  const method = useForm({
    resolver: yupResolver(AddTasksSchema),
    defaultValues: defaultForm,
  });

  useEffect(() => method.reset(defaultForm), [defaultForm, method]);

  return (
    <div>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(handleSubmit, onInvalidSubmit)}>
          <Item title={title} classTitle="title-green">
            <div className="borderTop pt-3">
              <RHFTextInput
                name="taskName"
                label="Name"
                placeholder="Enter name"
                tooltip="Name is required"
              />
            </div>
            <RHFTextInput
              name="description"
              label="Description"
              placeholder="Enter description"
              tooltip="Description"
            />
            <RHFDateAndTime
              name="airingDay"
              label="Airing Day"
              tooltip="Airing Day is required"
              className="mb-1"
            />
            <RHFDropdown
              name="kocName"
              label="KOC"
              defaultValue="Select KOC"
              classDropdownBody={styles.dropdownBody}
              data={usersQuery?.data?.map((item) => item.username)}
              tooltip="KOC is required"
            />
            <RHFDropdown
              name="platform"
              label="Platform"
              defaultValue="Select platform"
              data={platformsQuery?.data?.map((item) => item.name)}
              tooltip="Platform is required"
            />
            <RHFDropdown
              name="type"
              label="Type"
              defaultValue="Select type"
              data={typesQuery?.data?.map((item) => item.name)}
              tooltip="Type is required"
            />
            <RHFDropdown
              name="status"
              label="Status"
              defaultValue="Select status"
              data={statusQuery?.data?.map((item) => item.name)}
              tooltip="Status is required"
            />
            <RHFTagInput
              name="hashtag"
              label="Hashtag"
              placeholder="Enter tags"
              notRequiredInSuggestions
              tooltip="Hashtag is required"
            />
            <RHFDropdown
              name="affiliatePlatform"
              label="Affiliate Platform"
              defaultValue="Select Affiliate Platform"
              data={['Ecomobi', 'TikTokShop']}
              tooltip="Affiliate Platform is required"
            />
            <RHFTagInput
              name="products"
              label="Product"
              defaultValue="Select Product"
              placeholder="Enter Product Name"
              suggestions={productsQuery?.data}
              tooltip="Product Name is required"
            />
          </Item>
          <Item title="Target" classTitle="title-green">
            <RHFTextInput
              name="targetViews"
              label="Target (Views)"
              type="number"
              placeholder="Enter target views"
              tooltip="Target (Views) is required"
            />
            <RHFTextInput
              name="targetComments"
              label="Target (Comments)"
              type="number"
              placeholder="Enter target comments"
              tooltip="Target (Comments) is required"
            />
            <RHFTextInput
              name="targetLikes"
              label="Target (Likes)"
              placeholder="Enter target likes"
              type="number"
              tooltip="Target (Likes) is required"
            />
            <RHFTextInput
              name="targetShare"
              label="Target (Share)"
              type="number"
              placeholder="Enter target share"
              tooltip="Target (Share) is required"
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

export default TaskForm;
