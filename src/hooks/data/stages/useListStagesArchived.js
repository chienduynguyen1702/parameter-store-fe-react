import { useMemo, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getArchivedStages } from '../../../services/api';
const useListStagesArchived = ({
  archivedStage = {
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
  } = archivedStage;

  const [search, setSearch] = useState('');

  const parseData = useCallback((data) => {
    return data?.stages.map((item) => {
      return {
        id: item?.ID,
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
    select: (data) => parseData(data.data.data),
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

export default useListStagesArchived;
