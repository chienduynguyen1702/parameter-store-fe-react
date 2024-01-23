import { useCallback, useMemo, useEffect } from 'react';
import useQueryString from '../../hooks/useQueryString';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  archiveOrder,
  getListOrders,
  getMyListOrders,
} from '../../services/api';

export default function useListOrders(viewOption) {
  const queryClient = useQueryClient();

  const defaultQueryString = useMemo(() => {
    return {
      page: 1,
      limit: 10,
    };
  }, []);

  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;
  const parseData = useCallback((data) => {
    const orders = data.orders.map((item) => {
      return {
        id: item.id,
        order_name: item.order_name,
        delivery_code: item.delivery_code,
        city: item.city,
        amount: Number(item.amount),
        total_price: Number(item.total_price),
        koc_platform: item.koc_platform,
        koc_name: item.koc_name,
        phone_number: item.phone_number,
        address: item.address,
        order_date: item.order_date,
        transport_fee: Number(item.transport_fee),
        status: item.status,
        type: item.type,
        platform: item.platform,
        created_at: item.created_at,
        updated_at: item.updated_at,
      };
    });
    const ordersSummary = {
      totalOrders: data.ordersSummary.summary.total_orders || 0,
      totalRevenue: data.ordersSummary.summary.total_revenue || 0,
      averageValue: data.ordersSummary.summary.avg_value || 0,
      averageProduct: data.ordersSummary.summary.avg_product || 0,
    };
    const totalPage = data.pagination.totalPage;
    const totalOrders = data.pagination.total;

    return { orders, ordersSummary, totalPage, totalOrders };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['orders', queryString, viewOption],
    queryFn: () => {
      if (viewOption === 'View all orders') {
        return getListOrders(queryString);
      } else return getMyListOrders(queryString);
    },
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit,
  });

  const archiveOrderMutation = useMutation(
    async (id) => {
      return archiveOrder(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['orders'],
        });
        queryClient.invalidateQueries({
          queryKey: ['archived-orders'],
        });
      },
    },
  );

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(defaultQueryString);
    }
  }, [defaultQueryString, limit, page, queryString, setQueryString]);

  return {
    listOrders: data?.orders,
    ordersSummary: data?.ordersSummary,
    isSuccess,
    isLoading,
    totalOrders: data?.totalOrders,
    totalPage: data?.totalPage,
    archiveOrderMutation,
  };
}
