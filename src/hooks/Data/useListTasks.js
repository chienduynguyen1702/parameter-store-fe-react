import { useCallback, useMemo, useEffect, useContext, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import useQueryString from '../useQueryString';
import { getListTasks, archiveTask, getMyListTasks } from '../../services/api';
import { ViewOptionContext } from '../../screens/Task/TableView';

export default function useListTasks() {
  const viewOption = useContext(ViewOptionContext);

  const queryClient = useQueryClient();

  const [totalPage, setTotalPage] = useState(1);

  const defaultQueryString = useMemo(() => {
    return {
      page: 1,
      limit: 10,
    };
  }, []);

  const { queryString, setQueryString } = useQueryString();

  const { page, limit, from, to } = queryString;

  const handlePageChange = useCallback(
    ({ selected }) => {
      setQueryString({ ...queryString, page: selected + 1 });
    },
    [queryString, setQueryString],
  );

  const parseData = useCallback((data) => {
    const Tasks = data.tasks.map((item) => {
      const owner = {
        id: item.users.id,
        username: item.users.username,
        phone: item.users.phone,
        avatarUrl: item.users.avatar_url,
      };
      const result = {
        id: item.id,
        kocId: item.koc_id,
        taskTitle: item.task_title,
        task_name: item.task_name,
        description: item.description,
        platform: item.settings.find(
          (setting) => setting.type === 'user-platform',
        ),
        type: item.settings.find((setting) => setting.type === 'task-type'),
        status: item.settings.find((setting) => setting.type === 'task-status'),
        hashtag: item.hashtag,
        airingDay: item.airing_day,
        targetViews: item.target_views,
        targetComments: item.target_comments,
        targetLikes: item.target_likes,
        targetShare: item.target_share,
        owner: owner,
      };

      if (item.evidence_type === 'contents') {
        result.content = { ...item.contents };
      }

      if (item.evidence_type === 'other_contents') {
        result.content = { ...item.other_contents };
      }

      return result;
    });

    const pagination = {
      total: data.pagination.total,
      currentPage: data.pagination.currentPage,
      totalPage: data.pagination.totalPage,
      limit: data.pagination.limit,
    };
    return { pagination, Tasks };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['tasks', queryString, viewOption],
    queryFn: () => {
      if (
        typeof viewOption === 'undefined' ||
        viewOption === 'View all tasks'
      ) {
        return getListTasks(queryString);
      } else return getMyListTasks(queryString);
    },
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit,
  });

  const archiveTaskMutation = useMutation(
    async (id) => {
      return archiveTask(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['Tasks'],
        });
      },
    },
  );

  useEffect(() => {
    if (data?.pagination?.totalPage) {
      setTotalPage(data.pagination.totalPage);
    }
  }, [data?.pagination?.totalPage]);

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(defaultQueryString);
    }
  }, [defaultQueryString, limit, page, from, to, queryString, setQueryString]);

  return {
    listTasks: data?.Tasks,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    page,
    limit,
    totalPage: totalPage,
    handlePageChange,
    archiveTaskMutation,
  };
}
