import { useCallback, useMemo, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../../../../../../hooks/useQueryString';

import { getListProducts } from '../../../../../../services/api';

export default function useProductsSold() {
  const [totalPage, setTotalPage] = useState(1);

  const defaultQueryString = useMemo(() => {
    return {
      page: 1,
      limit: 10,
    };
  }, []);

  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  const parseData = useCallback((data) => {
    const products = data.products.map((item) => {
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
    const pagination = {
      total: data.pagination.total,
      currentPage: data.pagination.currentPage,
      totalPage: data.pagination.totalPage,
      limit: data.pagination.limit,
    };
    return { pagination, products };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['list-products-sku', queryString],
    queryFn: () => getListProducts(queryString),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit,
  });

  useEffect(() => {
    if (data?.pagination?.totalPage) {
      setTotalPage(data.pagination.totalPage);
    }
  }, [data?.pagination?.totalPage]);

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(defaultQueryString);
    }
  }, [defaultQueryString, limit, page, queryString, setQueryString]);

  return {
    listProductsSold: data?.products,
    isSuccess,
    isLoading,
    limit,
    totalProductsSold: data?.pagination?.total,
    totalPage: totalPage,
  };
}
