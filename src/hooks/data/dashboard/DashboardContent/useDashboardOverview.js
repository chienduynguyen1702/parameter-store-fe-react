import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../../../useQueryString';
import { dateToUrl } from '../../../../utils/helpers';

import {
  getSummaryCardContents,
  getTotalInteractOfContents,
} from '../../../../services/api';

export default function useDashboardOverview() {
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

  const summaryCardContents = useQuery({
    queryKey: ['summary-card-contents', queryString],
    queryFn: () => getSummaryCardContents(queryString),
    staleTime: 10 * 1000,
    select: (data) => data.data.data,
  });

  const totalInteract = useQuery({
    queryKey: ['total-interact', queryString],
    queryFn: () => getTotalInteractOfContents(queryString),
    staleTime: 10 * 1000,
    select: (data) => {
      return data.data.data;
    },
  });

  return {
    summaryCardContents: {
      isSuccess: summaryCardContents.isSuccess && totalInteract.isSuccess,
      totals: [
        Number(summaryCardContents?.data?.total_active_koc),
        Number(summaryCardContents?.data?.totals[0]?.total_videos),
        Number(summaryCardContents?.data?.totals[0]?.total_livestreams),
        Number(summaryCardContents?.data?.totals[0]?.total_stories),
        Number(summaryCardContents?.data?.totals[0]?.total_posts),
        totalInteract?.data?.sum_view,
        totalInteract?.data?.sum_like,
        totalInteract?.data?.sum_comment,
        totalInteract?.data?.sum_share,
        totalInteract?.data?.sum_save,
      ],
    },
  };
}
