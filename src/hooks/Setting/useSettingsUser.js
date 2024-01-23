import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getListSettings } from '../../services/api';

export default function useSettingsUser() {
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

  const userTiers = useQuery({
    queryKey: ['user-tier'],
    queryFn: () => getListSettings({ type: 'user-tier' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
  });

  const userPlatforms = useQuery({
    queryKey: ['user-platform'],
    queryFn: () => getListSettings({ type: 'user-platform' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
  });

  const userCategories = useQuery({
    queryKey: ['user-category'],
    queryFn: () => getListSettings({ type: 'user-category' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
  });

  return {
    userTiers,
    userPlatforms,
    userCategories,
  };
}
