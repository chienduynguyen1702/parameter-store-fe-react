import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { importProducts } from '../../services/api';

export default function useImportProducts() {
  const queryClient = useQueryClient();

  const importProductsMutation = useMutation(
    (data) => {
      return importProducts(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['list-products-sku'],
        });
        toast.success('Import products successfully');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );
  return {
    importProductsMutation,
  };
}
