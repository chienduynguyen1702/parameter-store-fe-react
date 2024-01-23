import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { importPerformances } from '../../services/api';

export default function useImportPerformance() {
  const queryClient = useQueryClient();

  const importPerformancesMutation = useMutation(
    (data) => {
      return importPerformances(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['list-performances-sku'],
        });
        toast.success('Import performances successfully');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  return {
    importPerformancesMutation,
  };
}
