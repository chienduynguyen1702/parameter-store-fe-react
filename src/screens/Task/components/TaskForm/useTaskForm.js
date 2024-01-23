import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useMatch, useOutletContext, useParams } from 'react-router';
import { toast } from 'react-toastify';

import {
  addTask,
  editTask,
  getListProducts,
  getListUser,
  getTask,
  getTaskSettings,
} from '../../../../services/api';

import { scrollToTopModal } from '../../../../utils/helpers';

export default function useTaskForm() {
  const { onClose } = useOutletContext();

  const queryClient = useQueryClient();

  // Switch between Add and Edit mode
  let addTaskMatch;
  // const addTaskMatch = useMatch('tasks/calendar-view/add-task');
  if (Boolean(useMatch('tasks/calendar-view/add-task'))) addTaskMatch = true;
  if (Boolean(useMatch('tasks/table-view/add-task'))) addTaskMatch = true;

  const isAddMode = useMemo(() => Boolean(addTaskMatch), [addTaskMatch]);

  const { id } = useParams();

  // Data suggestions query
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

  const usersQuery = useQuery({
    queryKey: ['users', { page: 1, limit: 1000 }],
    queryFn: () => getListUser({ page: 1, limit: 1000 }),
    staleTime: 10 * 1000,
    select: (data) => data.data.data.users,
  });

  const productsQuery = useQuery({
    queryKey: ['total-products'],
    queryFn: () => getListProducts({ page: 1, limit: 1000 }),
    staleTime: 10 * 1000,
    select: (data) =>
      data.data.data.products.map((item) => {
        return {
          id: item.id,
          text: item.title,
        };
      }),
  });

  // Task mutation query
  const addTasksMutation = useMutation((data) => {
    return addTask(data);
  });

  const editTaskMutation = useMutation(({ id, data }) => {
    return editTask(id, data);
  });

  const handleSubmit = useCallback(
    async (data) => {
      const idKoc = usersQuery?.data?.find(
        (item) => item.username === data?.kocName,
      )?.id;
      const body = {
        task_name: data?.taskName,
        description: data?.description,
        airing_day: new Date(data?.airingDay).toISOString(),
        koc_id: idKoc,
        platform: data?.platform,
        type: data?.type,
        status: data?.status,
        hashtag: data?.hashtag?.map((item) => item.text),
        affiliate_platform: data?.affiliatePlatform,
        products: data?.products,
        target_views: data?.targetViews,
        target_comments: data?.targetComments,
        target_likes: data?.targetLikes,
        target_share: data?.targetShare,
      };
      if (isAddMode) {
        return addTasksMutation.mutate(body, {
          onSuccess: () => {
            toast.success('Add task successfully!');
            onClose();
            queryClient.invalidateQueries('tasks', { limit: 5, page: 1 });
          },
          onError: (error) => {
            toast.error(error.response.data.message);
            scrollToTopModal();
          },
        });
      }

      return editTaskMutation.mutate(
        { id: id, data: body },
        {
          onSuccess: () => {
            toast.success('Edit task successfully!');
            onClose();
            queryClient.invalidateQueries({
              queryKey: ['tasks'],
            });
          },
          onError: (error) => {
            scrollToTopModal();
            toast.error(error.response.data.message);
          },
        },
      );
    },

    [
      addTasksMutation,
      editTaskMutation,
      isAddMode,
      id,
      queryClient,
      onClose,
      usersQuery,
    ],
  );

  //-------------------------------- Edit Task---------------------------------------

  // Default form value
  const [defaultForm, setDefaultForm] = useState({
    taskName: '',
    description: '',
    airingDay: null,
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
  });

  // Parse data to default form value
  const parseData = useCallback(
    (data) => {
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
          data?.hashtag?.map((item, index) => ({
            id: `${index}`,
            text: item,
          })) || defaultForm.hashtag,
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
    },
    [defaultForm],
  );
  // Query task
  useQuery({
    queryKey: ['task', id],
    queryFn: () => {
      return getTask(id);
    },
    enabled: !isAddMode,
    select: (data) => parseData(data.data.data),
    onSuccess: (data) => {
      setDefaultForm(data);
    },
  });

  return {
    platformsQuery,
    typesQuery,
    statusQuery,
    usersQuery,
    productsQuery,
    handleSubmit,
    isLoading: editTaskMutation.isLoading || addTasksMutation.isLoading,
    defaultForm,
  };
}
