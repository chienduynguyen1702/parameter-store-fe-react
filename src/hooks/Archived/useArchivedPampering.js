import { useMemo, useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { getArchivedPamperings, unarchivePampering } from '../../services/api';

export default function useArchivedPampering() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');

  // chua to data archiver_name
  const parseData = useCallback((data) => {
    return data.map((item) => {
      return {
        id: item.id,
        evidenceUrl: item.evidence_url,
        name: item.name,
        archiverName: item.archiver_username,
        archivedAt: item.archived_at,
      };
    });
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['archivedPamperings'],
    queryFn: () => {
      return getArchivedPamperings();
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

  const unarchivePamperingMutation = useMutation(
    (id) => {
      return unarchivePampering(id);
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

  return {
    archivedPamperings: dataFiltered,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchivePamperingMutation,
  };
}
