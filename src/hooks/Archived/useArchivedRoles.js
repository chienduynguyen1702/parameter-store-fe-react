import { useCallback } from 'react';

import useArchived from './useArchived';

export default function useArchiveRoles() {
  const parseData = useCallback((data) => {
    return data.data.data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        archiver: item.archiverUsername,
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
    archivedObject: 'roles',
    parseData,
  });

  return {
    archivedRoles: archivedList,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchiveRoleMutation: unarchiveMutation,
  };
}
