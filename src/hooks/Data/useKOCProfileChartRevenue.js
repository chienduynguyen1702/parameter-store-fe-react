import { useQuery } from '@tanstack/react-query';
// import { useEffect, useMemo } from 'react';
import moment from 'moment';
import { useParams } from 'react-router';

import useQueryString from '../../hooks/useQueryString';

import { getOrdersStatistic } from '../../services/api';

const useKOCProfileChartRevenue = ({ granularity }) => {
  const { id } = useParams();

  const {
    queryString,
    // setQueryString
  } = useQueryString();

  const { from, to } = queryString;

  // const defaultQueryString = useMemo(() => {
  //   const now = new Date();
  //   return {
  //     from: moment(new Date(now.getFullYear(), now.getMonth() - 1, 1)).format(
  //       'YYYY-MM-DD',
  //     ),
  //     to: moment(new Date()).format('YYYY-MM-DD'),
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!from || !to) {
  //     setQueryString(defaultQueryString);
  //   }
  // }, [defaultQueryString, from, to, queryString, setQueryString]);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [
      'koc-profile-chart-revenue',
      { kocIds: [id], granularity, from, to },
    ],
    queryFn: () => getOrdersStatistic({ kocIds: [id], granularity, from, to }),
    staleTime: 1000 * 10,
    select: (data) =>
      data.data.data.map((item) => ({
        bucket: item.bucket ? moment(item.bucket).format('DD/MM/YYYY') : null,
        Contents: item.delta ? Number(item.delta) : 0,
      })),
  });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
  };
};

export default useKOCProfileChartRevenue;
