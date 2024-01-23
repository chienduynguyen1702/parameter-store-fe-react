import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import useQueryString from '../../useQueryString';
import { dateToUrl } from '../../../utils/helpers';

import { getListSettings, getStatisticsKOCs } from '../../../services/api';

export default function useDashboardKOCs() {
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

  const changeArrayInt = useCallback((arr) => {
    return (arr = arr.map(function (element) {
      return parseInt(element);
    }));
  }, []);

  const parseData = useCallback(
    (data) => {
      let {
        rankingKOC,
        revenue,
        productSold,
        statisticBirthMonthOfKOC,
        statisticPostDashboard,
      } = data;
      rankingKOC = rankingKOC?.map((item) => {
        return {
          id: item.id,
          username: item.username,
          phone: item.phone,
          avatarUrl: item.avatar_url,
          totalContent: item.total_contents,
          tier: item.settings.find((setting) => setting.type === 'user-tier'),
          category: item.settings.find(
            (setting) => setting.type === 'user-category',
          ),
          platforms: item.settings.filter(
            (setting) => setting.type === 'user-platform',
          ),
        };
      });
      revenue = changeArrayInt(revenue);
      productSold = changeArrayInt(productSold);
      statisticBirthMonthOfKOC = changeArrayInt(statisticBirthMonthOfKOC);
      statisticPostDashboard = changeArrayInt(statisticPostDashboard);
      return {
        ...data,
        rankingKOC: [...rankingKOC],
        revenue: [...revenue],
        productSold: [...productSold],
        statisticBirthMonthOfKOC: [...statisticBirthMonthOfKOC],
        statisticPostDashboard: [...statisticPostDashboard],
      };
    },
    [changeArrayInt],
  );

  const parseDataSettings = useCallback((data) => {
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

  const statisticsKOCs = useQuery({
    queryKey: ['statistic-kocs', queryString],
    queryFn: () => getStatisticsKOCs(queryString),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data.analyticsKOC),
  });

  const userTiers = useQuery({
    queryKey: ['user-tier'],
    queryFn: () => getListSettings({ type: 'user-tier' }),
    staleTime: 10 * 1000,
    select: (data) => parseDataSettings(data.data.data),
  });

  return {
    statisticsKOCs: {
      isSuccess: statisticsKOCs.isSuccess,
      isLoading: statisticsKOCs.isLoading,
      totals: [
        Number(statisticsKOCs?.data?.total[0]?.total_active_koc),
        Number(statisticsKOCs?.data?.total[3]?.total_price),
        Number(statisticsKOCs?.data?.total[2]?.total_products_sold),
        Number(statisticsKOCs?.data?.total[1]?.total_contents),
        statisticsKOCs?.data?.total[4]?.total_views,
        statisticsKOCs?.data?.total[4]?.total_views /
          Number(statisticsKOCs?.data?.total[0]?.total_active_koc),
      ],
      rangeTime: statisticsKOCs?.data?.rangeTime,
      revenue: {
        name: 'Revenue (Million Dong)',
        delta: statisticsKOCs?.data?.revenue,
      },
      productSold: {
        name: 'Product Sold (Unit)',
        delta: statisticsKOCs?.data?.productSold,
      },
      kocByBirthday: {
        name: 'delta',
        delta: statisticsKOCs?.data?.statisticBirthMonthOfKOC,
      },
      kocByAgency: {
        name: 'delta',
        delta: statisticsKOCs?.data?.statisticKOCbyAgencyDashboard,
      },
      productSoldWithName: {
        name: '',
      },
      statisticPost: {
        name: 'Post',
        delta: [],
        // delta: statisticsKOCs?.data?.statisticPostDashboard,
      },
      statisticsEngagement: {
        name: 'Engagement',
        delta: [],
        // delta: statisticsKOCs?.data?.statisticEngagementDashboard,
      },
      tierDistribution: statisticsKOCs?.data?.tierDistribution,
      rankingKOC: statisticsKOCs?.data?.rankingKOC,
      // ageDistribution: statisticsKOCs?.data?.ageDistribution,
      ageDistribution: null,
      locationDistribution: statisticsKOCs?.data?.locationDistribution,
      platformDistribution: statisticsKOCs?.data?.platformDistribution,
    },
    userTiers,
  };
}
