import { useQuery } from '@tanstack/react-query';
import { getIsImportProgressContentsOfBrand } from '../../services/api';
import useQueryString from '../useQueryString';

export default function useImportContent() {
  const { queryString } = useQueryString();

  const { data, isSuccess, isLoading, isError, isFetching } = useQuery({
    queryKey: ['isImportContent', queryString],
    queryFn: () => getIsImportProgressContentsOfBrand(),
    select: (data) => data.data.data,
    staleTime: 30000,
    refetchInterval: 30000,
  });

  return {
    isImportContent: data?.isImport,
    isSuccess,
    isLoading: isLoading || isFetching,
    isError,
    importProgress: data?.progress ? Number(data?.progress).toFixed(1) : null,
  };
}
