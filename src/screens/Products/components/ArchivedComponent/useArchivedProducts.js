import { useMemo, useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  getArchivedProducts,
  unarchiveProduct,
} from '../../../../services/api';

export default function useArchivedProducts() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');

  const parseData = useCallback((data) => {
    return data.data.data.map((item) => {
      return {
        id: item.id,
        name: item.title,
        archiver: item.archiver_username,
        image: item.image_url,
        archivedAt: item.archived_at,
      };
    });
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['archivedProducts'],
    queryFn: async () => {
      return getArchivedProducts();
    },
    select: (data) => parseData(data),
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

  const unarchiveProductMutation = useMutation(
    async (id) => {
      return unarchiveProduct(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['archivedProducts'],
        });
        queryClient.invalidateQueries({
          queryKey: ['list-products-sku'],
        });
        toast.success('Product unarchived successfully');
      },
    },
  );

  return {
    archivedProducts: dataFiltered,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchiveProductMutation,
  };
}
