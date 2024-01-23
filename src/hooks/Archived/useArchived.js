import { useMemo, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  getArchivedKOCs,
  getArchivedLiquidation,
  getArchivedLiquidationItem,
  getArchivedPamperings,
  getArchivedRoles,
  getArchivedUsers,
  unarchiveKOC,
  unarchiveLiquidation,
  unarchiveLiquidationItem,
  unarchivePampering,
  unarchiveRole,
  unarchiveUser,
} from '../../services/api';

const ARCHIVED_OBJECT_LIST = {
  users: {
    archiveAPI: getArchivedUsers,
    unarchiveAPI: unarchiveUser,
    keyList: 'users',
    keyArchivistList: 'user-archivist-list',
    title: 'User',
  },
  roles: {
    archiveAPI: getArchivedRoles,
    unarchiveAPI: unarchiveRole,
    keyList: 'roles',
    keyArchivistList: 'role-archivist-list',
    title: 'Role',
  },
  kocs: {
    archiveAPI: getArchivedKOCs,
    unarchiveAPI: unarchiveKOC,
    keyList: 'kocs',
    keyArchivistList: 'koc-archivist-list',
    title: 'KOC',
  },
  liquidations: {
    archiveAPI: getArchivedLiquidation,
    unarchiveAPI: unarchiveLiquidation,
    keyList: 'liquidations',
    keyArchivistList: 'liquidation-archivist-list',
    title: 'Liquidation',
  },
  'liquidations-items': {
    archiveAPI: getArchivedLiquidationItem,
    unarchiveAPI: unarchiveLiquidationItem,
    keyList: 'liquidations-items',
    keyArchivistList: 'liquidation-item-archivist-list',
  },
  pampering: {
    archiveAPI: getArchivedPamperings,
    unarchiveAPI: unarchivePampering,
    keyList: 'pamperings',
    keyArchivistList: 'pampering-archivist-list',
    title: 'Pampering',
  },
};

export default function useArchived({
  archivedObject = 'users',
  parseData,
  params,
}) {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [ARCHIVED_OBJECT_LIST[archivedObject].keyList],
    queryFn: () => {
      if (params) {
        return ARCHIVED_OBJECT_LIST[archivedObject].archiveAPI(params);
      } else {
        return ARCHIVED_OBJECT_LIST[archivedObject].archiveAPI();
      }
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
      return ARCHIVED_OBJECT_LIST[archivedObject].unarchiveAPI(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ARCHIVED_OBJECT_LIST[archivedObject].keyList],
        });
        queryClient.invalidateQueries({
          queryKey: [ARCHIVED_OBJECT_LIST[archivedObject].keyArchivistList],
        });
        toast.success(
          `${ARCHIVED_OBJECT_LIST[archivedObject].title} unarchived successfully`,
        );
      },
    },
  );

  return {
    archivedList: dataFiltered,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchiveMutation,
  };
}
