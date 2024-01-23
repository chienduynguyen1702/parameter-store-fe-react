import { useCallback, useMemo, useEffect, useState } from 'react';
import useQueryString from '../../../../hooks/useQueryString';
import { useQuery } from '@tanstack/react-query';
import { getProductsByIdOrder } from '../../../../services/api';
import { useParams } from 'react-router';

export default function useProductsByIdOrder() {
  const { id } = useParams();

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
        sku_code: item.sku_code,
        shop: item.shop,
        title: item.title,
        description: item.description,
        amount: item?.products_orders?.[0].amount,
        image_url: item.image_url,
        price: item.full_price,
        type: item.settings.find((setting) => setting.type === 'product-type'),
        category: item.settings.find(
          (setting) => setting.type === 'product-category',
        ),
      };
    });
    const pagination = {
      total: data.pagination.total,
      totalPage: data.pagination.totalPage,
      currentPage: data.pagination.currentPage,
      limit: data.pagination.limit,
    };
    return { products, pagination };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['products-in-order', queryString],
    queryFn: () => getProductsByIdOrder(id, queryString),
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
    listProducts: data?.products,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    page,
    limit,
    totalPage: totalPage,
  };
}
