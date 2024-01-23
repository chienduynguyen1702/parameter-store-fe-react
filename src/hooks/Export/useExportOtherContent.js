import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import useQueryString from '../../hooks/useQueryString';

import { exportExcel } from '../../utils/helpers';

import { getOtherContentList } from '../../services/api';

export default function useExportOtherContent() {
  // Get Query String
  const { queryString } = useQueryString();

  // Export Other Content Mutation
  const exportMutation = useMutation((query) => getOtherContentList(query));

  // Handle Click Export
  const handleClickExport = useCallback(() => {
    exportMutation.mutate(queryString, {
      onSuccess: (data) => {
        exportExcel(data?.data?.data?.otherContents, 'Other Contents');
      },
      onError: (err) => {
        toast.error(err);
      },
    });
  }, [exportMutation, queryString]);

  return {
    isLoadingExport: exportMutation.isLoading,
    handleClickExport,
  };
}
