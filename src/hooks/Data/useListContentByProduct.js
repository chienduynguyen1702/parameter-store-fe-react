import { useCallback, useMemo, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../useQueryString';
import { fromNow } from '../../utils/helpers';

import {
  getTikTokContentsByProduct,
  getInstagramContentsByProduct,
  getYoutubeContentsByProduct,
  getFacebookContentsByProduct,
} from '../../services/api';

import { filterHashTags } from '../../utils/helpers';

export default function useListContentByProduct(id, platform = '') {
  const [totalPage, setTotalPage] = useState(1);

  const defaultQueryString = useMemo(() => {
    return {
      page: 1,
      limit: 12,
    };
  }, []);

  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  const parseData = useCallback((data) => {
    const contents = data.contents.map((item) => {
      return {
        avatarUrl: item.avatar_url,
        onPlatformId: item.on_platform_id,
        ownerId: item.owner_id,
        title: filterHashTags(item.title),
        description: filterHashTags(item.description),
        coverImageUrl: item.cover_image_url,
        likeCount: item.like_count,
        commentCount: item.comment_count,
        shareCount: item.share_count,
        viewCount: item.view_count,
        saveCount: item.save_count,
        embedHtml: item.embed_html,
        embedLink: item.embed_link,
        createTime: item.create_time,
        timeToNow:
          item?.platform === 'facebook'
            ? fromNow(Number(item.create_time))
            : fromNow(Number(item.create_time) * 1000),
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        id: item.id,
        platform: item.platform,
      };
    });
    const pagination = {
      total: data.pagination.total,
      currentPage: data.pagination.currentPage,
      totalPage: data.pagination.totalPage,
      limit: data.pagination.limit,
    };
    return { pagination, contents };
  }, []);

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: [platform, queryString, id],
    queryFn: () => {
      switch (platform) {
        case 'tiktok':
          return getTikTokContentsByProduct({
            ...queryString,
            ownerId: id,
          });
        case 'instagram':
          return getInstagramContentsByProduct({
            ...queryString,
            ownerId: id,
          });
        case 'youtube':
          return getYoutubeContentsByProduct({
            ...queryString,
            ownerId: id,
          });
        case 'facebook':
          return getFacebookContentsByProduct({
            ...queryString,
            ownerId: id,
          });
        default:
          break;
      }
    },
    staleTime: 60 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit && !!id,
    retry: 1,
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
  }, [defaultQueryString, limit, page, queryString, setQueryString]);

  return {
    listContents: data?.contents,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    isError,
    error,
    page,
    limit,
    totalPage: totalPage,
    handlePageChange,
  };
}
