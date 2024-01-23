import { useCallback } from 'react';

import useArchived from './useArchived';

export default function useArchivedUsers() {
  const parseData = useCallback((data) => {
    return data.data.data.map((item) => {
      return {
        id: item.id,
        image: item.avatar_url,
        name: item.username,
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
    archivedObject: 'users',
    parseData,
  });

  return {
    archivedUsers: archivedList,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchiveUserMutation: unarchiveMutation,
  };
}
