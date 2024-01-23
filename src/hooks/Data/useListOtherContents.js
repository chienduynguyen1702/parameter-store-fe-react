import { useCallback, useMemo, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

import useQueryString from '../../hooks/useQueryString';
import { getOtherContentList } from '../../services/api';

export default function useListOtherContent(platform = '') {
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
    const otherContents = data.otherContents.map((item) => {
      return {
        id: item.id,
        ownerId: item.owner_id,
        title: item.title,
        description: item.description,
        likeCount: item.like_count,
        commentCount: item.comment_count,
        shareCount: item.share_count,
        viewCount: item.view_count,
        saveCount: item.save_count,
        settingTypeId: item.setting_type_id,
        settingPlatformId: item.setting_platform_id,
        archived: item.archived,
        archiverId: item.archiver_id,
        archivedAt: item.archived_at,
        timeToNow: moment(item?.create_time * 1000, 'x').fromNow(),
        updatedAt: item.updated_at,
        createTime: item?.create_time,
        coverImageUrl: item?.evidence_url,
        ownerUserName: item.owner_username,
        type: item.type,
        platform: item.platform,
      };
    });
    const pagination = {
      total: data.pagination.total,
      currentPage: data.pagination.currentPage,
      totalPage: data.pagination.totalPage,
      limit: data.pagination.limit,
    };
    const statistics = {
      totalComment: data.statistics.total_comment || 0,
      totalLike: data.statistics.total_like || 0,
      totalShare: data.statistics.total_share || 0,
      totalView: data.statistics.total_view || 0,
      totalSave: data.statistics.total_save || 0,
    };
    return { pagination, otherContents, statistics };
  }, []);

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ['otherContents', queryString, platform],
    queryFn: () => {
      return getOtherContentList({
        ...queryString,
      });
    },

    staleTime: 60 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit,
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
    listContents: data?.otherContents,
    pagination: data?.pagination,
    statistics: data?.statistics,
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
