import { useCallback, useMemo, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../useQueryString';
import { getOrdersBySKUCode } from '../../services/api';

export default function useListOrdersBySKU(SKUCode) {
  const [totalPage, setTotalPage] = useState(1);

  const defaultQueryString = useMemo(() => {
    return {
      page: 1,
      limit: 10,
    };
  }, []);

  const { queryString, setQueryString } = useQueryString();

  const { page, limit, from, to } = queryString;

  const parseData = useCallback((data) => {
    const orders = data.orders.map((item) => {
      return {
        id: item.id,
        order_name: item.order_name,
        delivery_code: item.delivery_code,
        city: item.city,
        amount: item.amount,
        total_price: item.total_price,
        koc_platform: item.koc_platform,
        koc_name: item.koc_name,
        phone_number: item.phone_number,
        address: item.address,
        order_date: item.order_date,
        transport_fee: item.transport_fee,
        status: item.status,
        platform: item.platform,
        created_at: item.created_at,
        updated_at: item.updated_at,
      };
    });
    const pagination = {
      total: data.pagination.total,
      totalPage: data.pagination.totalPage,
      currentPage: data.pagination.currentPage,
      limit: data.pagination.limit,
    };
    return { orders, pagination };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['orders-by-SKU', queryString],
    queryFn: () => getOrdersBySKUCode(SKUCode, queryString),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit,
  });

  const handlePageChange = useCallback(
    ({ selected }) => {
      setQueryString({ ...queryString, page: selected + 1 });
    },
    [queryString, setQueryString],
  );

  useEffect(() => {
    if (data?.pagination?.totalPage) {
      setTotalPage(data.pagination.totalPage);
    }
  }, [data?.pagination?.totalPage]);

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(defaultQueryString);
    }
  }, [defaultQueryString, limit, page, from, to, queryString, setQueryString]);

  return {
    listOrdersBySKU: data?.orders,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    page,
    limit,
    totalPage: totalPage,
    handlePageChange,
  };
}
