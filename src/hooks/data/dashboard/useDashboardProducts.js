import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../../useQueryString';
import { dateToUrl } from '../../../utils/helpers';

import { getStatisticsProducts } from '../../../services/api';

export default function useDashboardProducts() {
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

  const statisticsProducts = useQuery({
    queryKey: ['statistic-products', queryString],
    queryFn: () => getStatisticsProducts(queryString),
    staleTime: 10 * 1000,
    select: (data) => {
      return data.data.data.analyticsProduct;
    },
  });

  return {
    statisticsProducts: {
      isLoading: statisticsProducts.isLoading,
      isSuccess: statisticsProducts.isSuccess,
      total: {
        activeKOC: Number(statisticsProducts?.data?.total?.total_active_koc),
        product: Number(statisticsProducts?.data?.total?.total_product),
        activeProductBySKU: Number(
          statisticsProducts?.data?.total?.total_active_product_by_sku,
        ),
        productSold: Number(
          statisticsProducts?.data?.total?.total_product_sold,
        ),
        category: Number(statisticsProducts?.data?.total?.total_category),
      },
      rangeTime: statisticsProducts?.data?.rangeTime,
      productSoldEcomobi: {
        name: 'Ecomobi',
        delta: statisticsProducts?.data?.dataChartProductSoldEcomobi?.map(
          (str) => parseInt(str, 10),
        ),
      },
      productSoldTikTok: {
        name: 'TikTokShop',
        delta: statisticsProducts?.data?.dataChartProductSoldTikTok?.map(
          (str) => parseInt(str, 10),
        ),
      },
      revenueByCategory: statisticsProducts?.data?.revenueByCategory?.map?.(
        (item) => ({
          name: item.name,
          Revenue: item.sum,
        }),
      ),
      rankingProduct: statisticsProducts?.data?.productRanking,
    },
  };
}
