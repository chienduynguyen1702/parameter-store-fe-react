import { useMemo, useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { getArchivedOrders, unarchiveOrder } from '../../../services/api';

export default function useArchivedOrders() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');

  const parseData = useCallback((data) => {
    return data.data.data.map((item) => {
      return {
        id: item.id,
        name: item.order_name,
        archiver: item.archiver_username,
        archivedAt: item.archived_at,
      };
    });
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['archived-orders'],
    queryFn: async () => {
      return getArchivedOrders();
    },
    select: (data) => parseData(data),
  });

  const dataFiltered = useMemo(() => {
    if (!data) return [];
    const dataFiltered = data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
    return dataFiltered;
  }, [data, search]);

  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  const unarchiveOrderMutation = useMutation(
    async (id) => {
      return unarchiveOrder(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['archived-orders'],
        });
        queryClient.invalidateQueries({
          queryKey: ['orders'],
        });
        toast.success('Orders unarchived successfully');
      },
    },
  );

  return {
    archivedOrders: dataFiltered,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchiveOrderMutation,
  };
}
