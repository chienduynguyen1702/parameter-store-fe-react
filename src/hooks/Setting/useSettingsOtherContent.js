import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getListSettings } from '../../services/api';

function useSettingsOtherContent() {
  const parseData = useCallback((data) => {
    const settings = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        color: item.color,
        type: item.type,
      };
    });
    return settings;
  }, []);

  const otherContentPlatforms = useQuery({
    queryKey: ['other-content-platform'],
    queryFn: () => getListSettings({ type: 'user-platform' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
  });

  const otherContentPostTypes = useQuery({
    queryKey: ['other-content-post-type'],
    queryFn: () => getListSettings({ type: 'user-post-type' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
  });

  return {
    otherContentPlatforms,
    otherContentPostTypes,
  };
}

export default useSettingsOtherContent;
