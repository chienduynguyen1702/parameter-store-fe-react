import { useCallback } from 'react';

import useArchived from './useArchived';

export default function useArchivedLiquidations() {
  const parseData = useCallback((data) => {
    return data.data.data.map((item) => {
      return {
        id: item.id,
        image: null,
        name: item.name,
        archiver: item.archiver_username,
        archivedAt: item.archived_at,
      };
    });
  }, []);

  const {
    archivedList,
    isLoading,
    isSuccess,
    search,
    handleSearch,
    unarchiveMutation,
  } = useArchived({
    archivedObject: 'liquidations',
    parseData,
  });

  return {
    archivedLiquidations: archivedList,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchiveLiquidationsMutation: unarchiveMutation,
  };
}
