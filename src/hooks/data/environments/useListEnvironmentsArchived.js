import { useMemo, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getArchivedEnvironments } from '../../../services/api';
const useListEnvironmentsArchived = ({
  archivedEnvironment = {
    // listArchivedAPI: '',
    // archiveAPI: '',
    // unarchiveAPI: '',
    // keyArchivistList: '',
    // keyList: '',
    // title: '',
    // project_id: '',
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
    project_id,
  } = archivedEnvironment;

  const [search, setSearch] = useState('');

  const parseData = useCallback((data) => {
    return data?.map((item) => {
      return {
        id: item?.id,
        name: item?.name,
        // name: item.name,
        image: item?.avatar_url,
        archiver: item?.archiver_username,
        archivedAt: item?.archived_at,
      };
    });
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [keyArchivistList],
    queryFn: () => {
      return listArchivedAPI(project_id);
    },
    select: (data) => parseData(data.data.environments),
  });

  const dataFiltered = useMemo(() => {
    if (!data) return [];
    const dataFiltered = data.filter((item) =>
      item?.name.toLowerCase().includes(search.toLowerCase()),
    );
    return dataFiltered;
  }, [data, search]);

  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  const unarchiveMutation = useMutation(
    async (id) => {
      return unarchiveAPI(project_id,id);
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
      return archiveAPI(project_id,id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [keyList],
        });
        queryClient.invalidateQueries({
          queryKey: [keyArchivistList],
        });
        toast.success(`${title} archived successfully`);
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

export default useListEnvironmentsArchived;
