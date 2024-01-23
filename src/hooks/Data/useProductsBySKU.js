import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getProductsBySKUCode } from '../../services/api';

import useQueryString from '../useQueryString';

export default function useProductsBySKU(id) {
  const { queryString } = useQueryString();

  const parseData = useCallback((data) => {
    const products = data.map((item) => {
      return {
        id: item.id,
        skuCode: item.sku_code,
        shop: item.shop,
        title: item.title,
        description: item.description,
        imageUrl: item.image_url,
        full_price: item.full_price,
        current_price: item.current_price,
        discounted_rate: item.discounted_rate,
        type: item.settings.find((setting) => setting.type === 'product-type'),
        category: item.settings.find(
          (setting) => setting.type === 'product-category',
        ),
      };
    });
    return {
      products,
    };
  }, []);
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['products-sku'],
    queryFn: () => getProductsBySKUCode(id, queryString),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!id,
  });

  return {
    listProducts: data?.products,
    isSuccess,
    isLoading,
  };
}
