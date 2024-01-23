import { useCallback } from 'react';

import useArchived from './useArchived';
import useQueryString from '../useQueryString';

export default function useArchivedLiquidationsItems() {
  const { queryString } = useQueryString();
  const { fileId } = queryString;

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
    archivedObject: 'liquidations-items',
    parseData,
    params: fileId,
  });

  return {
    archivedLiquidationsItems: archivedList,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchiveLiquidationsItemsMutation: unarchiveMutation,
  };
}
