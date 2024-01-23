import { useCallback, useMemo, useEffect, useContext } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import moment from 'moment';

import useQueryString from '../useQueryString';

import { getListTasks, archiveTask, getMyListTasks } from '../../services/api';

import { dateToHour, dateToUrl } from '../../utils/helpers';

import { ViewOptionContextCalendar } from '../../screens/Task/CalendarView';

export default function useListTasksCalendar() {
  const viewOption = useContext(ViewOptionContextCalendar);
  const queryClient = useQueryClient();

  const defaultQueryString = useMemo(() => {
    const now = new Date();
    return {
      from: dateToUrl(new Date(now.getFullYear(), now.getMonth(), -10)),
      to: dateToUrl(new Date(now.getFullYear(), now.getMonth() + 1, +10)),
    };
  }, []);

  const { queryString, setQueryString } = useQueryString();

  const { from, to } = queryString;

  const handlePageChange = useCallback(
    ({ selected }) => {
      setQueryString({ ...queryString, page: selected + 1 });
    },
    [queryString, setQueryString],
  );

  const parseData = useCallback((data) => {
    const listEvents = data.tasks.map((item) => ({
      title: item.task_title,
      start: dateToUrl(new Date(item.airing_day)),
      className: '',

      id: item.id,
      name: item.task_name,
      description: item.description,
      koc: item.users.username,
      platform: item.settings.find(
        (setting) => setting.type === 'user-platform',
      ),
      deadline: dateToHour(new Date(item.airing_day)),
      taskTitle: item.task_title,
      type: item.settings.find((setting) => setting.type === 'task-type'),
      hashtag: item.hashtag,
      status: item.settings.find((setting) => setting.type === 'task-status'),
    }));

    return { listEvents };
  }, []);

  const handleDateChange = useCallback(
    (start, end) => {
      const params = {
        ...queryString,
        from: moment(start).format('YYYY-MM-DD'),
        to: moment(end).format('YYYY-MM-DD'),
      };
      setQueryString(params);
    },
    [queryString, setQueryString],
  );

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
    enabled: !!from && !!to,
    // onSuccess: (data) => {},
  });

  const archiveTaskMutation = useMutation(
    async (id) => {
      return archiveTask(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['tasks'],
        });
      },
    },
  );

  useEffect(() => {
    if (!from || !to) {
      setQueryString(defaultQueryString);
    }
  }, [defaultQueryString, from, to, queryString, setQueryString]);

  return {
    listEvents: data?.listEvents,
    isSuccess,
    isLoading,
    from,
    to,
    handlePageChange,
    handleDateChange,
    archiveTaskMutation,
  };
}
