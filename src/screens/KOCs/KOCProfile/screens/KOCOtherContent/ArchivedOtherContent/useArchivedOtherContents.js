import { useMemo, useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  getArchiveOtherContents,
  getMyArchiveOtherContents,
  unArchiveOtherContents,
} from '../../../../../../services/api';

export default function useArchivedOtherContents(id) {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');

  const parseData = useCallback((data) => {
    const OtherContent = data.map((item) => {
      return {
        id: item.id,
        name: item.title,
        image: item.evidence_url,
        archiver: item.archiver_name,
        archivedAt: item.archived_at,
      };
    });
    return OtherContent;
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['archivedOtherContents', id],
    queryFn: () => {
      if (id === 'me') {
        return getMyArchiveOtherContents();
      }
      return getArchiveOtherContents(id);
    },
    select: (data) => parseData(data.data.data),
  });

  const dataFiltered = useMemo(() => {
    if (!data) return [];
    const dataFiltered = data.filter((item) =>
      item?.name?.toLowerCase().includes(search?.toLowerCase()),
    );
    return dataFiltered;
  }, [data, search]);

  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  const unarchiveOtherContentMutation = useMutation(
    (id) => {
      return unArchiveOtherContents(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['otherContents'],
        });
        queryClient.invalidateQueries({
          queryKey: ['archivedOtherContents'],
        });
        toast.success('Other contents unarchived successfully');
      },
    },
  );

  return {
    archivedOtherContent: dataFiltered,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchiveOtherContentMutation,
  };
}
