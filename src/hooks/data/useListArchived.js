import { useMemo, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ARCHIVED_USERS } from '../mocks/users';

const useListArchived = ({
  archivedObject = {
    // listArchivedAPI: '',
    // archiveAPI: '',
    // unarchiveAPI: '',
    // keyArchivistList: '',
    // keyList: '',
    // title: '',
  },
}) => {
  const queryClient = useQueryClient();

  const {
    listArchivedAPI,
    archiveAPI,
    unarchiveAPI,
    keyList,
    keyArchivistList,
    title,
  } = archivedObject;

  const [search, setSearch] = useState('');

  const parseData = useCallback((data) => {
    return ARCHIVED_USERS.map((item) => {
      return {
        id: item.id,
        name: item.name,
        image: item.avatar_url,
        archiver: item.archiver_username,
        archivedAt: item.archived_at,
      };
    });
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [keyArchivistList],
    queryFn: () => {
      return listArchivedAPI();
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

  const unarchiveMutation = useMutation(
    async (id) => {
      return unarchiveAPI(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [keyList],
        });
        queryClient.invalidateQueries({
          queryKey: [keyArchivistList],
        });
        toast.success(`${title} unarchived successfully`);
      },
    },
  );

  const archiveMutation = useMutation(
    (id) => {
      return archiveAPI(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [keyList],
        });
        queryClient.invalidateQueries({
          queryKey: [keyArchivistList],
        });
        toast.success(`${title} unarchived successfully`);
      },
    },
  );

  return {
    archivedList: dataFiltered,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    archiveMutation,
    unarchiveMutation,
  };
};

export default useListArchived;
