import { useCallback, useMemo, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from './../useQueryString';
import { fromNow } from '../../utils/helpers';

import {
  getContentsOnFacebookBySKUCode,
  getContentsOnTikTokBySKUCode,
  getContentsOnInstagramBySKUCode,
  getContentsOnYoutubeBySKUCode,
} from '../../services/api';

import { filterHashTags } from '../../utils/helpers';

export default function useContentsBySKU(id, platform = '') {
  const [totalPage, setTotalPage] = useState(1);

  const defaultQueryString = useMemo(() => {
    return {
      page: 1,
      limit: 10,
    };
  }, []);

  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  const parseData = useCallback((data) => {
    const contents = data?.contents?.map((item) => {
      return {
        onPlatformId: item.on_platform_id,
        ownerId: item.owner_id,
        title: item.title,
        platform: item.platform,
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
    const pagination = {
      total: data.pagination.total,
      currentPage: data.pagination.currentPage,
      totalPage: data.pagination.totalPage,
      limit: data.pagination.limit,
    };
    return {
      contents,
      pagination,
    };
  }, []);

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ['contents-sku', queryString, platform],
    queryFn: () => {
      switch (platform) {
        case 'tiktok':
          return getContentsOnTikTokBySKUCode(id, queryString);
        case 'instagram':
          return getContentsOnInstagramBySKUCode(id, queryString);
        case 'youtube':
          return getContentsOnYoutubeBySKUCode(id, queryString);
        case 'facebook':
          return getContentsOnFacebookBySKUCode(id, queryString);
        default:
          break;
      }
    },
    staleTime: 60 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!id && !!page && !!limit,
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
    // statistics: data?.statistics,
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
