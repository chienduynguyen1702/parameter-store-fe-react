import { useCallback, useMemo, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import useQueryString from '../useQueryString';

import {
  getOtherContentsByKOC,
  archiveOtherContents,
  getMyOtherContent,
  deleteOtherContents,
} from '../../services/api';

export default function useListOtherContentByKOC(id) {
  const queryClient = useQueryClient();
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
    const contents = data.otherContents.map((item) => {
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
        coverImageUrl: item.cover_image_url,
        createTime: item?.create_time,
        evidenceUrl: item?.evidence_url,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        ownerUsername: item.owner_username,
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
    return { pagination, contents };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['otherContents', queryString, id],
    queryFn: () => {
      if (id === 'me') {
        return getMyOtherContent(queryString);
      }
      return getOtherContentsByKOC({
        ...queryString,
        ownerId: id,
      });
    },
    staleTime: 60 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit && !!id,
    retry: 1,
  });

  const archiveOtherContentMutation = useMutation(
    async (id) => {
      return archiveOtherContents(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['otherContents'],
        });
      },
    },
  );

  const deleteOtherContentMutation = useMutation(
    async (id) => {
      return deleteOtherContents(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['otherContents'],
        });
      },
    },
  );

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
    page,
    limit,
    totalPage: totalPage,
    handlePageChange,
    archiveOtherContentMutation,
    deleteOtherContentMutation,
  };
}
