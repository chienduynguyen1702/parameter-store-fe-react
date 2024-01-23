import { useCallback, useMemo, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

import useQueryString from '../../hooks/useQueryString';

import {
  getTikTokContents,
  getInstagramContents,
  getYoutubeContents,
  getFacebookContents,
  deleteTikTokContent,
} from '../../services/api';

import { filterHashTags, handleLongNumber } from '../../utils/helpers';

export default function useListContents(platform = '') {
  const queryClient = useQueryClient();

  const defaultQueryString = useMemo(() => {
    return {
      page: 1,
      limit: 10,
      onlyFailed: false,
    };
  }, []);

  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  const parseData = useCallback((data) => {
    const contents = data.contents.map((item) => {
      return {
        onPlatformId: item.on_platform_id,
        ownerId: item.owner_id,
        title: item.title ? item.title : item.on_platform_id,
        description: item.description ? filterHashTags(item.description) : '',
        coverImageUrl: item.cover_image_url ? item.cover_image_url : '',
        likeCount: item.like_count ? handleLongNumber(item.like_count) : '-',
        commentCount: item.like_count
          ? handleLongNumber(item.comment_count)
          : '-',
        shareCount: item.like_count ? handleLongNumber(item.share_count) : '-',
        viewCount: item.like_count ? handleLongNumber(item.view_count) : '-',
        embedHtml: item.embed_html,
        embedLink: item.embed_link,
        createTime: item.create_time,
        timeToNow: item.create_time
          ? moment(Number(item.create_time) * 1000).fromNow()
          : null,
        createdAt: item.created_at,
        updatedAt: item.updated_at ? moment(item.updated_at).fromNow() : '-',
        id: item.id,
        saveCount: item.save_count ? handleLongNumber(item.save_count) : '-',
        ownerUserName: item.owner_username ? '@' + item.owner_username : '',

        revenue: item.revenue ? handleLongNumber(item.revenue) : '-',
        unitSales: item.unit_sales ? handleLongNumber(item.unit_sales) : '-',
        ordersCount: item.orders_count
          ? handleLongNumber(item.orders_count)
          : '-',
        buyersCount: item.buyers_count
          ? handleLongNumber(item.buyers_count)
          : '-',
        estCommissions: item.est_commission
          ? handleLongNumber(item.est_commission)
          : '-',
        refunds: item.refunds ? handleLongNumber(item.refunds) : '-',
        productRefunds: item.product_refunds
          ? handleLongNumber(item.product_refunds)
          : '-',
        coRate: item.co_rate || '-',
        vv: item.vv ? handleLongNumber(item.vv) : '-',
        productImpressions: item.product_impressions
          ? handleLongNumber(item.product_impressions)
          : '-',
        productClicks: item.product_clicks
          ? handleLongNumber(item.product_clicks)
          : '-',
        ctr: item.ctr || '-',
        // format video Duration from seconds to mm:ss
        videoDuration: item.video_duration
          ? moment.utc(item.video_duration * 1000).format('mm:ss')
          : null,
      };
    });
    const pagination = {
      total: data.pagination.total,
      totalPage: data.pagination.totalPage,
    };

    return { pagination, contents };
  }, []);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['contents', queryString, platform],
    queryFn: () => {
      switch (platform) {
        case 'tiktok':
          return getTikTokContents({
            ...queryString,
          });
        case 'instagram':
          return getInstagramContents({
            ...queryString,
          });
        case 'youtube':
          return getYoutubeContents({
            ...queryString,
          });
        case 'facebook':
          return getFacebookContents({
            ...queryString,
          });
        default:
          break;
      }
    },

    staleTime: 60 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit,
    retry: 1,
  });

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(defaultQueryString);
    }
  }, [defaultQueryString, limit, page, queryString, setQueryString]);

  const deleteContentMutation = useMutation(
    async (id) => {
      return deleteTikTokContent(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['contents', queryString, platform],
        });
        queryClient.invalidateQueries({
          queryKey: ['contents-summary'],
        });
      },
    },
  );

  return {
    listContents: data?.contents,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    isError,
    limit,
    totalPage: data?.pagination?.totalPage,
    deleteContentMutation,
  };
}
