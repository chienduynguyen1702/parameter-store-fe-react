import { useCallback } from 'react';
import useArchived from './useArchived';

export default function useArchivedKOCs() {
  const parseData = useCallback((data) => {
    return data.data.data.map((item) => {
      return {
        id: item.id,
        name: item.username,
        archiver: item.archiver_username,
        image: item.avatar_url,
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
    archivedObject: 'kocs',
    parseData,
  });

  return {
    archivedKOCs: archivedList,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchiveKOCMutation: unarchiveMutation,
  };
}
