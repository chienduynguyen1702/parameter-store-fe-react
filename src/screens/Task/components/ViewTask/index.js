import React, { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import cn from 'classnames';
import styles from './ViewTask.module.sass';

import {
  RHFTextInput,
  RHFTagInput,
  RHFDropdown,
  Item,
  RHFDateAndTime,
} from '../../../../components';

import { getTask, getTaskSettings } from '../../../../services/api';

const defaultForm = {
  taskName: '',
  description: '',
  airingDay: new Date(),
  kocName: '',
  platform: '',
  type: '',
  status: '',
  hashtag: [],
  affiliatePlatform: '',
  products: [],
  targetViews: '',
  targetComments: '',
  targetLikes: '',
  targetShare: '',
};

const ViewTask = ({ title = '' }) => {
  const { onClose } = useOutletContext();

  const navigate = useNavigate();

  const { id } = useParams();

  const method = useForm({
    defaultValues: defaultForm,
  });

  const platformsQuery = useQuery({
    queryKey: ['user-platform'],
    queryFn: () => getTaskSettings({ type: 'user-platform' }),
    staleTime: 10 * 1000,
    select: (data) =>
      data.data.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          color: item.color,
          type: item.type,
        };
      }),
  });

  const typesQuery = useQuery({
    queryKey: ['task-type'],
    queryFn: () => getTaskSettings({ type: 'task-type' }),
    staleTime: 10 * 1000,
    select: (data) =>
      data.data.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          color: item.color,
          type: item.type,
        };
      }),
  });

  const statusQuery = useQuery({
    queryKey: ['task-status'],
    queryFn: () => getTaskSettings({ type: 'task-status' }),
    staleTime: 10 * 1000,
    select: (data) =>
      data.data.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          color: item.color,
          type: item.type,
        };
      }),
  });

  const parseData = useCallback((data) => {
    return {
      ...defaultForm,
      // if field is null, set default value
      taskName: data?.task_name || defaultForm.taskName,
      description: data?.description || defaultForm.description,
      airingDay: new Date(data?.airing_day || defaultForm.airingDay),
      kocName: data?.users.username || defaultForm.kocName,
      platform:
        data?.settings
          .filter((item) => item.type === 'user-platform')
          .map((item) => item.name)
          ?.join('') || defaultForm.platform,
      type:
        data?.settings
          .filter((item) => item.type === 'task-type')
          .map((item) => item.name)
          ?.join('') || defaultForm.type,
      status:
        data?.settings
          .filter((item) => item.type === 'task-status')
          .map((item) => item.name)
          ?.join('') || defaultForm.status,
      hashtag:
        data?.hashtag?.map((item, index) => ({ id: `${index}`, text: item })) ||
        defaultForm.hashtag,
      affiliatePlatform:
        data?.affiliate_platform || defaultForm.affiliatePlatform,
      products:
        data?.products?.map((item) => ({
          id: `${item.id}`,
          text: item.title,
        })) || defaultForm.products,
      targetViews: data?.target_views || defaultForm.targetViews,
      targetComments: data?.target_comments || defaultForm.targetComments,
      targetLikes: data?.target_likes || defaultForm.targetLikes,
      targetShare: data?.target_share || defaultForm.targetShare,
    };
  }, []);

  // get Task data
  const usersQuery = useQuery({
    queryKey: ['task', id],
    queryFn: () => {
      return getTask(id);
    },
    select: (data) => parseData(data.data.data),
    onSuccess: (data) => {
      method.reset(data);
    },
  });
  return (
    <div className={styles.list}>
      <FormProvider {...method}>
        <form>
          <Item title={title} classTitle="title-green">
            <RHFTextInput
              name="taskName"
              label="Name"
              tooltip="Name is required"
              disabled
            />
            <RHFTextInput
              name="description"
              label="Description"
              tooltip="Description"
              disabled
            />
            <RHFDateAndTime
              name="airingDay"
              label="Airing Day"
              tooltip="Airing Day is required"
              className="mb-1"
              disabled={true}
            />
            <RHFDropdown
              name="kocName"
              label="KOC"
              defaultValue=""
              tooltip="KOC is required"
              data={[usersQuery?.data?.kocName]}
              disabled
            />
            <RHFDropdown
              name="platform"
              label="Platform"
              defaultValue=""
              tooltip="Platform is required"
              data={platformsQuery?.data?.map((item) => item.name)}
              disabled
            />
            <RHFDropdown
              name="type"
              label="Type"
              defaultValue=""
              tooltip="Type is required"
              data={typesQuery?.data?.map((item) => item.name)}
              disabled
            />
            <RHFDropdown
              name="status"
              label="Status"
              defaultValue=""
              tooltip="Status is required"
              data={statusQuery?.data?.map((item) => item.name)}
              disabled
            />
            <RHFTagInput
              name="hashtag"
              label="Hashtag"
              placeholder="Enter tags"
              notRequiredInSuggestions
              tooltip="Hashtag is required"
              disabled
            />
            <RHFDropdown
              name="affiliatePlatform"
              label="Affiliate Platform"
              defaultValue=""
              tooltip="Affiliate Platform is required"
              data={platformsQuery?.data?.map((item) => item.name)}
              disabled
            />
            <RHFTagInput
              name="products"
              label="Product"
              defaultValue="Select Product"
              // suggestions={productsQuery?.data}
              placeholder="Enter Product Name"
              tooltip="Product Name is required"
              disabled
            />
          </Item>
          <Item title="Target" classTitle="title-green">
            <RHFTextInput
              name="targetViews"
              label="Target (Views)"
              type="number"
              tooltip="Target (Views) is required"
              disabled
            />
            <RHFTextInput
              name="targetComments"
              label="Target (Comments)"
              type="number"
              tooltip="Target (Comments) is required"
              disabled
            />
            <RHFTextInput
              name="targetLikes"
              label="Target (Likes)"
              type="number"
              tooltip="Target (Likes) is required"
              disabled
            />
            <RHFTextInput
              name="targetShare"
              label="Target (Share)"
              type="number"
              tooltip="Target (Share) is required"
              disabled
            />
          </Item>

          {/* Button  */}
          <div className={styles.footer}>
            <p onClick={onClose} className={cn('button-white me-3')}>
              Cancel
            </p>
            {/* <Decentralization permissions={[""]}> */}
            <p
              className="button"
              onClick={() => {
                navigate(`/tasks/table-view/edit-task/${id}`);
              }}
            >
              Edit
            </p>
            {/* </Decentralization> */}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ViewTask;
