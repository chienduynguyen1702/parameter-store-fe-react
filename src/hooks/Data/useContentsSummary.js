import { useQuery } from '@tanstack/react-query';

import useQueryString from '../../hooks/useQueryString';

import { getTikTokContentsSummary } from '../../services/api';
import { useCallback } from 'react';

export default function useContentsSummary(platform = '') {
  const { queryString } = useQueryString();

  const { search, from, to, kocs, hashtag } = queryString;

  const queryStringSummary = {
    search,
    from,
    to,
    kocs,
    hashtag,
  };

  const parseData = useCallback((data) => {
    return {
      totalView: data.total_view,
      totalLike: data.total_like,
      totalComment: data.total_comment,
      totalShare: data.total_share,
      totalSave: data.total_save,
    };
  }, []);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['contents-summary', queryStringSummary, platform],
    queryFn: () => {
      switch (platform) {
        case 'tiktok':
          return getTikTokContentsSummary({
            ...queryString,
          });
        // case 'instagram':
        //   return getInstagramContents({
        //     ...queryString,
        //   });
        // case 'youtube':
        //   return getYoutubeContents({
        //     ...queryString,
        //   });
        // case 'facebook':
        //   return getFacebookContents({
        //     ...queryString,
        //   });
        default:
          break;
      }
    },

    staleTime: 60 * 1000,
    select: (data) => parseData(data?.data?.data?.[0]),
  });

  return {
    data,
    isSuccess,
    isLoading,
    isError,
  };
}
