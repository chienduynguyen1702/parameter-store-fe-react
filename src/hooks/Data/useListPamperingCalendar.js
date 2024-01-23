import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

import useQueryString from '../useQueryString';

import { archivePampering, getListPamperings } from '../../services/api';

import { dateToUrl } from '../../utils/helpers';

import { ViewOptionContextCalendar } from '../../screens/Pampering/CalendarView';

export default function useListPamperingCalendar() {
  const viewOption = useContext(ViewOptionContextCalendar);

  const queryClient = useQueryClient();

  const getWeekBoundariesForMonth = (date) => {
    const firstDateOfMonth = moment(date).startOf('M');
    const firstDateOfWeek = firstDateOfMonth.clone().startOf('week');
    const lastDayOfWeek = firstDateOfWeek.clone().add(42, 'days');

    return {
      from: dateToUrl(firstDateOfWeek.toDate()),
      to: dateToUrl(lastDayOfWeek.toDate()),
    };
  };

  const defaultQueryString = useMemo(() => {
    return getWeekBoundariesForMonth();
  }, []);

  const { queryString, setQueryString } = useQueryString();

  const { from, to } = queryString;

  const handlePageChange = useCallback(
    ({ selected }) => {
      setQueryString({ ...queryString, page: selected + 1 });
    },
    [queryString, setQueryString],
  );

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

  const parseData = useCallback((data) => {
    const listEvents = data?.pamperings?.map((item) => ({
      title: item.name,
      start: dateToUrl(new Date(item.date)),
      className: '',

      id: item.id,
      pamperingTitle: item.name,
      name: item.name,
      category: item.category,
      cost: item.cost,
      pic: item.pic,
      status: item.status,
    }));

    return { listEvents };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['pamperings', queryString, viewOption],
    queryFn: () => {
      return getListPamperings(queryString);
    },
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!from && !!to,
    onSuccess: (data) => {},
  });

  const archivePamperingMutation = useMutation(
    async (id) => {
      return archivePampering(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['archivedPamperings'],
        });
        queryClient.invalidateQueries({
          queryKey: ['pamperings'],
        });
        toast.success('Pampering unarchived successfully');
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
    getWeekBoundariesForMonth,
    isSuccess,
    isLoading,
    handleDateChange,
    handlePageChange,
    archivePamperingMutation,
  };
}
