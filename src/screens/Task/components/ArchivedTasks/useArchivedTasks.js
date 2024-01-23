import { useMemo, useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { getArchivedTasks, unarchiveTask } from '../../../../services/api';

export default function useArchivedTasks() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');

  const parseData = useCallback((data) => {
    return data.map((item) => {
      return {
        id: item.id,
        name: item.task_name,
        image: item.users.avatar_url,
        archiver: item.archiver_username,
        archivedAt: item.archived_at,
      };
    });
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['archivedTasks'],
    queryFn: async () => {
      return getArchivedTasks();
    },
    select: (data) => {
      return parseData(data.data.data);
    },
  });

  const dataFiltered = useMemo(() => {
    if (!data) return [];
    const dataFiltered = data.filter((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase()),
    );
    return dataFiltered;
  }, [data, search]);

  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  const unarchiveTaskMutation = useMutation(
    async (id) => {
      return unarchiveTask(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['archivedTasks'],
        });
        queryClient.invalidateQueries({
          queryKey: ['tasks'],
        });
        toast.success('Task unarchived successfully');
      },
    },
  );

  return {
    archivedTasks: dataFiltered,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchiveTaskMutation,
  };
}
