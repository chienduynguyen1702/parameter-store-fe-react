import { useCallback, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getTasksBySKUCode } from '../../services/api';
import useQueryString from '../useQueryString';

import { dateToUrl, dateToHour } from '../../utils/helpers';

export default function useTasksBySKU(id) {
  const { queryString, setQueryString } = useQueryString();

  const { from, to } = queryString;

  const defaultQueryString = useMemo(() => {
    const now = new Date();
    return {
      from: dateToUrl(new Date(now.getFullYear(), now.getMonth(), -10)),
      to: dateToUrl(new Date(now.getFullYear(), now.getMonth() + 1, +10)),
    };
  }, []);

  const parseData = useCallback((data) => {
    const listEvents = data?.tasks?.map((item) => ({
      title: item?.task_title,
      start: dateToUrl(new Date(item?.airing_day)),
      className: '',

      id: item?.id,
      name: item?.task_name,
      description: item?.description,
      koc: item?.users.username,
      platform: item?.settings?.find(
        (setting) => setting?.type === 'user-platform',
      ),
      deadline: dateToHour(new Date(item?.airing_day)),
      taskTitle: item?.task_title,
      type: item?.settings?.find((setting) => setting?.type === 'task-type'),
      hashtag: item?.hashtag,
      status: item?.settings?.find(
        (setting) => setting?.type === 'task-status',
      ),
    }));

    return { listEvents };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['tasks-sku', queryString],
    queryFn: () => getTasksBySKUCode(id, queryString),
    staleTime: 10 * 1000,
    enabled: !!from && !!to && !!id,
    select: (data) => parseData(data.data.data),
  });

  useEffect(() => {
    if (!from || !to) {
      setQueryString(defaultQueryString);
    }
  }, [defaultQueryString, from, to, queryString, setQueryString]);

  return {
    listTasks: data?.listEvents,
    isSuccess,
    isLoading,
  };
}
