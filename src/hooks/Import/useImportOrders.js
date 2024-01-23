import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { importOrders } from '../services/api';

export default function useImportOrders() {
  const queryClient = useQueryClient();

  const importOrdersMutation = useMutation(
    async (data) => {
      return importOrders(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['orders'],
        });
        toast.success('Import orders successfully');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );
  return {
    importOrdersMutation,
  };
}
