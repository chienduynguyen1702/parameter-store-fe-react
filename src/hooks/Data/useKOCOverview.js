import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

import useQueryString from '../../hooks/useQueryString';

import {
  getKOCsProfileOverviewContent,
  getKOCsProfileOverviewProductSold,
  getKOCsProfileOverviewRevenue,
  getKOCsProfileOverviewView,
} from '../../services/api';
import moment from 'moment';

export default function useKOCOverview({ kocId }) {
  const { queryString, setQueryString } = useQueryString();

  const defaultQueryString = useMemo(() => {
    const now = new Date();
    return {
      from: moment(new Date(now.getFullYear(), now.getMonth() - 1, 1)).format(
        'YYYY-MM-DD',
      ),
      to: moment(new Date()).format('YYYY-MM-DD'),
    };
  }, []);

  const { from, to } = queryString;

  useEffect(() => {
    if (!from || !to) {
      setQueryString(defaultQueryString);
    }
  }, [defaultQueryString, from, to, queryString, setQueryString]);

  const overviewContent = useQuery({
    queryKey: ['koc-profile-overview-content', queryString],
    queryFn: () => getKOCsProfileOverviewContent(kocId, queryString),
    staleTime: 1000 * 10,
    select: (data) => data.data.data,
  });

  const overviewView = useQuery({
    queryKey: ['koc-profile-overview-view', queryString],
    queryFn: () => getKOCsProfileOverviewView(kocId, queryString),
    staleTime: 1000 * 10,
    select: (data) => data.data.data,
  });

  // const overviewRevenue = useQuery({
  //   queryKey: ['koc-profile-overview-revenue', queryString],
  //   queryFn: () => getKOCsProfileOverviewRevenue(kocId, queryString),
  //   staleTime: 1000 * 10,
  //   select: (data) => data.data.data,
  // });

  // const overviewProductSold = useQuery({
  //   queryKey: ['koc-profile-overview-productSold', queryString],
  //   queryFn: () => getKOCsProfileOverviewProductSold(kocId, queryString),
  //   staleTime: 1000 * 10,
  //   select: (data) => data.data.data,
  // });

  return {
    isLoading: overviewContent.isLoading && overviewView.isLoading,
    // &&
    // overviewRevenue.isLoading &&
    // overviewProductSold.isLoading
    isSuccess: overviewContent.isSuccess && overviewView.isSuccess,
    // &&
    // overviewRevenue.isSuccess &&
    // overviewProductSold.isSuccess
    isError: overviewContent.isError && overviewView.isError,
    // &&
    // overviewRevenue.isError &&
    // overviewProductSold.isError,
    data: {
      rangeTime: overviewContent.data?.dates,
      // productSold: {
      //   name: 'Product Sold',
      //   delta: overviewProductSold?.data?.dataChartProductSold,
      // },
      // revenue: {
      //   name: 'Revenue',
      //   delta: overviewRevenue?.data?.dataChartRevenueTikTokShop,
      // },
      viewTikTok: {
        name: 'TikTok',
        delta: overviewView?.data?.viewTikTok,
      },
      viewInstagram: {
        name: 'Instagram',
        delta: overviewView?.data?.viewInstagram,
      },
      viewYoutube: {
        name: 'Youtube',
        delta: overviewView?.data?.viewYoutube,
      },
      viewFacebook: {
        name: 'Facebook',
        delta: overviewView?.data?.viewFacebook,
      },
      viewOther: {
        name: 'Other',
        delta: overviewView?.data?.viewOtherContent || [],
      },
      contentTikTok: {
        name: 'TikTok',
        delta: overviewContent?.data?.cTikTok,
      },
      contentInstagram: {
        name: 'Instagram',
        delta: overviewContent?.data?.cInstagram,
      },
      contentYoutube: {
        name: 'Youtube',
        delta: overviewContent?.data?.cYoutube,
      },
      contentFacebook: {
        name: 'Facebook',
        delta: overviewContent?.data?.cFacebook,
      },
      contentOther: {
        name: 'Other',
        delta: overviewContent?.data?.cOtherContent,
      },
      // totals: {
      //   productSold:
      //     overviewProductSold?.data?.totalProductSold?.[0]
      //       .total_products_sold || 0,
      //   revenue: overviewRevenue?.data?.totalRevenue?.[0].total_price || 0,
      //   totalView: overviewView?.data?.totalView?.[0].total_view || 0,
      //   totalContent:
      //     overviewContent?.data?.totalContent?.[0].total_content || 0,
      // },
    },
  };
}
