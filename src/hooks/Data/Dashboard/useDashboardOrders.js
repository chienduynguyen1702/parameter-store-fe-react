import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../../useQueryString';
import { dateToUrl } from '../../../utils/helpers';

import { getStatisticsOrders } from '../../../services/api';

export default function useDashboardOrders() {
  const { queryString, setQueryString } = useQueryString();

  const { from, to } = queryString;

  const defaultQueryString = useMemo(() => {
    const now = new Date();
    return {
      from: dateToUrl(new Date(now.getFullYear(), now.getMonth(), 1)),
      to: dateToUrl(new Date()),
    };
  }, []);

  useEffect(() => {
    if (!from || !to) {
      setQueryString(defaultQueryString);
    }
  }, [defaultQueryString, from, to, queryString, setQueryString]);

  const statisticOrders = useQuery({
    queryKey: ['statistic-orders', queryString],
    queryFn: () => getStatisticsOrders(queryString),
    staleTime: 10 * 1000,
    select: (data) => {
      return data.data.data.analyticsOrder;
    },
  });

  return {
    statisticOrders: {
      isSuccess: statisticOrders.isSuccess,
      total: {
        activeKOC: Number(statisticOrders?.data?.total?.total_active_koc),
        order: Number(statisticOrders?.data?.total?.total_order),
        revenue: Number(statisticOrders?.data?.total?.total_revenue),
        averageValuePerOrder: Number(
          statisticOrders?.data?.total?.average_value_per_order,
        ),
        averageProductPerOrder: Number(
          statisticOrders?.data?.total?.average_product_per_order,
        ),
      },
      rangeTime: statisticOrders?.data?.rangeTime,
      order: {
        name: 'delta',
        delta: statisticOrders?.data?.dataChartOrder,
      },
      orderEcomobi: {
        name: 'Ecomobi',
        delta: statisticOrders?.data?.dataChartOrderEcomobi,
      },
      orderTikTokShop: {
        name: 'TikTokShop',
        delta: statisticOrders?.data?.dataChartOrderTikTokShop,
      },
      revenue: {
        name: 'delta',
        delta: statisticOrders?.data?.dataChartRevenue,
      },
      revenueEcomobi: {
        name: 'Ecomobi',
        delta: statisticOrders?.data?.dataChartRevenueEcomobi,
      },
      revenueTikTokShop: {
        name: 'TikTokShop',
        delta: statisticOrders?.data?.dataChartRevenueTikTokShop,
      },
    },
  };
}
