import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getListSettings } from '../../services/api';

function useSettingsPampering() {
  const parseData = useCallback((data) => {
    const settings = data.data.data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        color: item.color,
        type: item.type,
      };
    });
    return settings;
  }, []);

  const pamperingCategories = useQuery({
    queryKey: ['pampering-category'],
    queryFn: () => getListSettings({ type: 'pampering-category' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data),
  });

  const pamperingPICs = useQuery({
    queryKey: ['pampering-pic'],
    queryFn: () => getListSettings({ type: 'pampering-pic' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data),
  });

  const pamperingStatus = useQuery({
    queryKey: ['pampering-status'],
    queryFn: () => getListSettings({ type: 'pampering-status' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data),
  });

  return {
    pamperingCategories,
    pamperingPICs,
    pamperingStatus,
  };
}

export default useSettingsPampering;
