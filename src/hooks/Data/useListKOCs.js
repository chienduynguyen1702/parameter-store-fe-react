import { useCallback, useMemo, useEffect, useState } from 'react';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../../hooks/useQueryString';

import { fromNow, handleLongNumber } from '../../utils/helpers';

import { getListKOC } from '../../services/api';

export default function useListKOCs() {
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
    const KOCs = data.users.map((item) => {
      let isNew = false;
      const diffTime = moment(new Date()).diff(moment(item.created_at), 'days');
      if (diffTime < 7) {
        isNew = true;
      }
      return {
        id: item.id,
        email: item.email,
        username: item.username,
        phone: item.phone,
        address: item.address,
        bio: item.bio,
        color: item.color,
        avatarUrl: item.avatar_url,
        lastSignIn: fromNow(item.last_sign_in),
        roles: item.roles.map((role) => role.name),
        tier: item.settings.find((setting) => setting.type === 'user-tier'),
        category: item.settings.find(
          (setting) => setting.type === 'user-category',
        ),
        platforms: item.settings.filter(
          (setting) => setting.type === 'user-platform',
        ),
        permissionsCount: item.permissions_count,
        isNew,
        totalFollowers: item.total_followers
          ? handleLongNumber(item.total_followers)
          : '-',
        totalVideos: item.total_videos
          ? handleLongNumber(item.total_videos)
          : '-',
        totalLikesOfVideos: item.total_likes
          ? handleLongNumber(item.total_likes)
          : '-',
      };
    });
    const pagination = {
      total: data.pagination.total,
      currentPage: data.pagination.currentPage,
      totalPage: data.pagination.totalPage,
      limit: data.pagination.limit,
    };
    return { pagination, KOCs };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['KOCs', queryString],
    queryFn: () => getListKOC(queryString),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit,
  });

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
    listKOCs: data?.KOCs,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    page,
    limit,
    totalPage: totalPage,
  };
}
