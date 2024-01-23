import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getListSettings } from '../../services/api';

export default function useSettingsProduct() {
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

  const productTypes = useQuery({
    queryKey: ['product-type'],
    queryFn: () => getListSettings({ type: 'product-type' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
  });

  const productCategories = useQuery({
    queryKey: ['product-category'],
    queryFn: () => getListSettings({ type: 'product-category' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
  });

  return {
    productTypes,
    productCategories,
  };
}
