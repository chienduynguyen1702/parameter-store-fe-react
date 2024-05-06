import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import useQueryString from '../../useQueryString';

import {
  changeArrayInt,
  dateToUrl,
  filterHashTags,
  fromNow,
} from '../../../utils/helpers';

// import {
//   getStatisticsContentsOfTotalViews,
//   getStatisticsContentsOfViews,
//   getStatisticsHighlights,
//   getTopHashtags,
//   getTopUsers,
//   getTopVideos,
// } from '../../../services/api';

export default function useDashboardHighlights() {
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

  const parseDataView = useCallback((data) => {
    return data.map((item) => {
      return item.delta;
    });
  }, []);

  const parseData = useCallback((data) => {
    let { dataChartOrder } = data;
    dataChartOrder = changeArrayInt(dataChartOrder);

    return {
      ...data,
      dataChartOrder: [...dataChartOrder],
    };
  }, []);

  const data = useQuery({
    queryKey: ['statistic-highlights', queryString],
    // queryFn: () => getStatisticsHighlights({ ...queryString, long: 'long' }),
    staleTime: 10 * 1000,
    select: (data) => {
      return parseData(data.data.data.analyticsOrder);
    },
  });

  const topKOCs = useQuery({
    queryKey: ['top-users', queryString],
    // queryFn: () => getTopUsers({ ...queryString, limit: 60 }),
    staleTime: 10 * 1000,
    select: (data) => {
      return data.data.data;
    },
  });

  const topHashtags = useQuery({
    queryKey: ['top-hashtags', queryString],
    // queryFn: () => getTopHashtags({ ...queryString, limit: 60 }),
    staleTime: 10 * 1000,
    select: (data) => {
      return data.data.data;
    },
  });

  const parseDataTopVideo = useCallback((data) => {
    return data.map((item) => {
      return {
        onPlatformId: item.on_platform_id,
        ownerId: item.owner_id,
        title: item.title,
        description: filterHashTags(item.description),
        coverImageUrl: item.cover_image_url,
        likeCount: item.like_count,
        commentCount: item.comment_count,
        shareCount: item.share_count,
        viewCount: item.view_count,
        embedHtml: item.embed_html,
        embedLink: item.embed_link,
        createTime: item.create_time,
        timeToNow: fromNow(Number(item.create_time) * 1000),
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        id: item.id,
        saveCount: item.save_count,
        ownerUserName: item.owner_username,
      };
    });
  }, []);
  const topVideos = useQuery({
    queryKey: ['top-videos', queryString],
    // queryFn: () => getTopVideos(queryString),
    staleTime: 10 * 1000,
    select: (data) => parseDataTopVideo(data.data.data.results),
  });

  const totalViews = useQuery({
    queryKey: ['total-views', queryString],
    // queryFn: () => getStatisticsContentsOfTotalViews(queryString),
    staleTime: 10 * 1000,
    select: (data) => {
      return data.data.data;
    },
  });

  const statisticsViews = useQuery({
    queryKey: ['statistics-contents-views', queryString],
    // queryFn: () => getStatisticsContentsOfViews('day', queryString),
    staleTime: 10 * 1000,
    select: (data) => parseDataView(data.data.data),
  });

  return {
    statisticsHighlights: {
      isSuccess: {
        overview: data.isSuccess,
        // topProducts: data.isSuccess,
        topProducts: true,
        topKOCs: topKOCs.isSuccess,
        topHashtags: topHashtags.isSuccess,
        topVideos: topVideos.isSuccess,
        statisticsViews: statisticsViews.isSuccess,
        orders: data.isSuccess,
        views: data.isSuccess,
      },
      // data.isSuccess &&
      // topKOCs.isSuccess &&
      // topHashtags.isSuccess &&
      // topVideos.isSuccess &&
      // totalViews.isSuccess &&
      // statisticsViews.isSuccess,
      totals: [
        Number(data?.data?.total[0]?.total_active_koc),
        Number(data?.data?.total[2]?.total_price),
        Number(data?.data?.total[3]?.total_products_sold),
        Number(data?.data?.total[1]?.total_contents),
        Number(totalViews?.data),
        // Check if total_active_koc is not zero before performing division
        Number(data?.data?.total[0]?.total_active_koc) !== 0
          ? data?.data?.total[4]?.total_views /
            Number(data?.data?.total[0]?.total_active_koc)
          : 0,
      ],
      rangeTime: data?.data?.rangeTime,
      statisticsViews: {
        name: 'Views',
        delta: statisticsViews?.data,
      },
      orders: {
        name: 'Orders',
        delta: data?.data?.dataChartOrder,
      },
      views: {
        name: 'Views',
        delta: data?.data?.dataChartOrder,
      },
      topKOCs: topKOCs?.data,
      topProducts: data?.data?.topProductSold,
      topHashtags: topHashtags?.data,
      topVideos: topVideos?.data,
    },
  };
}
