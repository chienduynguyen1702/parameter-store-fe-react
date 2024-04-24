import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../../../useQueryString';
import { dateToUrl } from '../../../../utils/helpers';

import { getStatisticsContents } from '../../../../services/api';

export default function useDashboardStatistic() {
  const { queryString, setQueryString } = useQueryString();

  const { from, to } = queryString;

  const defaultQueryString = useMemo(() => {
    const now = new Date();
    return {
      from: dateToUrl(new Date(now.getFullYear(), now.getMonth(), 1)),
      to: dateToUrl(new Date()),
    };
  }, []);

  useEffect(() => {
    if (!from || !to) {
      setQueryString(defaultQueryString);
    }
  }, [defaultQueryString, from, to, queryString, setQueryString]);

  const statisticsContent = useQuery({
    queryKey: ['statistic-contents', queryString],
    queryFn: () => getStatisticsContents(queryString),
    staleTime: 10 * 1000,
    select: (data) => {
      return data.data.data;
    },
  });

  return {
    statisticsContent: {
      isSuccess: statisticsContent.isSuccess,
      totals: statisticsContent?.data?.totals[0],
      dates: statisticsContent?.data?.dates,
      contentsAll: {
        name: 'Content',
        delta: statisticsContent?.data?.c,
      },
      contentsFacebook: {
        name: 'Facebook',
        delta: statisticsContent?.data?.cFacebook?.map((str) =>
          parseInt(str, 10),
        ),
      },
      contentsInstagram: {
        name: 'Instagram',
        delta: statisticsContent?.data?.cInstagram?.map((str) =>
          parseInt(str, 10),
        ),
      },
      contentsYoutube: {
        name: 'Youtube',
        delta: statisticsContent?.data?.cYoutube?.map((str) =>
          parseInt(str, 10),
        ),
      },
      contentsTikTok: {
        name: 'TikTok',
        delta: statisticsContent?.data?.cTikTok?.map((str) =>
          parseInt(str, 10),
        ),
      },
    },
  };
}
