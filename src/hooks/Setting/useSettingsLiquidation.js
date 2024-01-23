import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { getListSettings } from '../../services/api';

export default function useSettingsLiquidation() {
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

  const liquidationCategories = useQuery({
    queryKey: ['liquidation-category'],
    queryFn: () => getListSettings({ type: 'liquidation-category' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
  });

  const liquidationPICs = useQuery({
    queryKey: ['liquidation-pic'],
    queryFn: () => getListSettings({ type: 'liquidation-pic' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
  });

  const liquidationStatus = useQuery({
    queryKey: ['liquidation-status'],
    queryFn: () => getListSettings({ type: 'liquidation-status' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
  });

  return {
    liquidationCategories,
    liquidationPICs,
    liquidationStatus,
  };
}
