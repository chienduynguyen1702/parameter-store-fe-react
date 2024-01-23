import {
  forceUpdateContentsOfBrand,
  getIsForceUpdateContentsOfBrand,
  cancelForceUpdateContentsOfBrand,
  lastTimeUpdateContent,
  // getForceUpdateProgress,
} from '../../services/api';
import useQueryString from '../useQueryString';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function useForceUpdateContent() {
  const { queryString } = useQueryString();
  const queryClient = useQueryClient();

  const { data, isSuccess, isLoading, isError, isFetching } = useQuery({
    queryKey: ['isForceUpdateContent', queryString],
    queryFn: () => getIsForceUpdateContentsOfBrand(),
    select: (data) => data.data.data,
    staleTime: 30000,
    refetchInterval: 30000,
  });

  const { data: lastTimeUpdate } = useQuery({
    queryKey: ['contentUpdateTimestamp'],
    queryFn: () => lastTimeUpdateContent(),
    select: (data) => data.data.data.updated_at,
    staleTime: 3600 * 1000,
  });

  // const forceUpdateProgress = useQuery({
  //   queryKey: ['forceUpdateProgress'],
  //   queryFn: () => getForceUpdateProgress(),
  //   select: (data) => {
  //     const { current, total } = data.data.data;
  //     const percentage = total ? current / total : 0;

  //     return {
  //       current,
  //       total,
  //       percentage: percentage * 100 < 1 ? 0 : percentage * 100,
  //     };
  //   },
  //   staleTime: 1000,
  //   refetchInterval: 10000,
  // });

  const forceUpdateContentOfBrandMutation = useMutation(
    () => forceUpdateContentsOfBrand(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['isForceUpdateContent'],
        });
      },
    },
  );

  const cancelForceUpdateContentOfBrandMutation = useMutation(
    () => cancelForceUpdateContentsOfBrand(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['isForceUpdateContent'],
        });
      },
    },
  );

  return {
    isUpdatingContent: data?.isForceUpdate,
    forceUpdateProgress: data?.progress
      ? Number(data?.progress).toFixed(1)
      : null,
    lastTimeUpdate,
    isSuccess,
    isLoading:
      isLoading || forceUpdateContentOfBrandMutation.isLoading || isFetching,
    isError,
    forceUpdateContentOfBrandMutation,
    cancelForceUpdateContentOfBrandMutation,
  };
}
