import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useEffect, useMemo } from 'react';

import {
  getListProductSoldByKOC,
  getMyListProductSold,
  getMyTotalProductSold,
  getTotalProductSoldByKOC,
} from '../../services/api';

import { useQueryString } from '../../hooks';

export default function useKocProfileProductSold() {
  const { queryString, setQueryString } = useQueryString();
  const { page, limit } = queryString;

  const { id } = useParams();
  const parserList = (data) => {
    const productSold = data?.listProductSold?.map((item) => {
      return {
        id: item?.id,
        imageUrl: item?.image_url,
        title: item?.title,
        ecomobi: item?.ecomobi,
        livestream: item?.livestream,
        tiktokShow: item?.tiktokshow,
        video: item?.video,
      };
    });
    const totalPage = data.pagination.totalPage;
    const totalProductSold = data.pagination.total;

    return { productSold, totalPage, totalProductSold };
  };
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['kocProfile-productSold', queryString],
    queryFn: () => {
      if (id === 'me') {
        return getMyListProductSold(queryString);
      }
      return getListProductSoldByKOC({
        ...queryString,
        ownerId: id,
      });
    },
    select: (data) => parserList(data?.data?.data),
  });

  const parserTotal = (data) => {
    return [
      data?.['totalTiktokShopLivestream'] || 0,
      data?.['totalTiktokShopShow'] || 0,
      data?.['totalTiktokShopVideo'] || 0,
      data?.['totalEcomobi'] || 0,
    ];
  };
  const totalOverviewProductSold = useQuery({
    queryKey: ['kocProfile-totalProductSold'],
    queryFn: () => {
      if (id === 'me') {
        return getMyTotalProductSold(queryString);
      }
      return getTotalProductSoldByKOC({
        ...queryString,
        ownerId: id,
      });
    },
    select: (data) => parserTotal(data?.data?.data),
    // onSuccess: (data) => data?.data?.data
  });
  const defaultQueryString = useMemo(() => {
    return {
      page: 1,
      limit: 10,
    };
  }, []);

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(defaultQueryString);
    }
  }, [defaultQueryString, limit, page, queryString, setQueryString]);

  return {
    listProductSold: data?.productSold,
    totalOverviewProductSold,
    isSuccess,
    isLoading,
    totalPage: data?.totalPage || 1,
    totalProductSold: data?.totalProductSold,
  };
}
