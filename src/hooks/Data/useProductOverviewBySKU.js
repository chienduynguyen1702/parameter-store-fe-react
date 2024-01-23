import { useCallback, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useQueryString } from '../../hooks';
import { dateToUrl } from '../../utils/helpers';

import {
  getGMVProductBySKUCode,
  getViewBySKUCode,
  getSoldBySKUCode,
  getContentBySKUCode,
} from '../../services/api';

export default function useProductOverviewBySKU(id) {
  const { queryString, setQueryString } = useQueryString();

  const { from, to } = queryString;

  const defaultQueryString = useMemo(() => {
    const now = new Date();
    return {
      from: dateToUrl(new Date(now.getFullYear(), 0, 1)),
      to: dateToUrl(new Date()),
    };
  }, []);

  useEffect(() => {
    if (!from || !to) {
      setQueryString(defaultQueryString);
    }
  }, [defaultQueryString, from, to, queryString, setQueryString]);

  const parseGMVData = useCallback((data) => {
    const gmv = data.map((item) => parseInt(item.gmv));
    const rangeTime = data.map((item) => item.delta);
    return { rangeTime, gmv };
  }, []);

  const parseViewData = useCallback((data) => {
    const result = [];
    Object.entries(data).forEach(([key, item]) => {
      const value = item.map((subItem) => subItem.views);
      result.push({
        delta: value,
        name: key,
      });
    });
    return result;
  }, []);

  const parseSoldData = useCallback((data) => {
    return data.map((item) => item.sold);
  }, []);

  const parseContentData = useCallback((data) => {
    const tiktok = {
      delta: [],
      name: 'tiktok',
    };
    const instagram = {
      delta: [],
      name: 'instagram',
    };
    const facebook = {
      delta: [],
      name: 'facebook',
    };
    const youtube = {
      delta: [],
      name: 'youtube',
    };
    const other = {
      delta: [],
      name: 'other',
    };
    data.forEach((item) => {
      tiktok.delta.push(item?.tiktok || 0);
      instagram.delta.push(item?.instagram || 0);
      facebook.delta.push(item?.facebook || 0);
      youtube.delta.push(item?.youtube || 0);
      other.delta.push(item?.other || 0);
    });
    return [tiktok, instagram, facebook, youtube, other];
  }, []);

  const data = useQuery({
    queryKey: ['gmv-product', queryString],
    queryFn: () => getGMVProductBySKUCode(id, queryString),
    staleTime: 10 * 1000,
    select: (data) => {
      return parseGMVData(data.data.data);
    },
  });

  const dataView = useQuery({
    queryKey: ['view-product', queryString],
    queryFn: () => getViewBySKUCode(id, queryString),
    staleTime: 10 * 1000,
    select: (data) => {
      return parseViewData(data.data.data);
    },
  });

  const dataSold = useQuery({
    queryKey: ['sold-product', queryString],
    queryFn: () => getSoldBySKUCode(id, queryString),
    staleTime: 10 * 1000,
    select: (data) => {
      return parseSoldData(data.data.data);
    },
  });

  const dataContent = useQuery({
    queryKey: ['content-product', queryString],
    queryFn: () => getContentBySKUCode(id, queryString),
    staleTime: 10 * 1000,
    select: (data) => {
      return parseContentData(data.data.data);
    },
  });

  return {
    overview: {
      isSuccess:
        data.isSuccess &&
        dataView.isSuccess &&
        dataSold.isSuccess &&
        dataContent.isSuccess,
      gmv: data?.data?.gmv,
      rangeTime: data?.data?.rangeTime,
      views: dataView?.data,
      sold: dataSold?.data,
      contents: dataContent?.data,
    },
  };
}
