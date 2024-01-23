import { useQuery } from '@tanstack/react-query';
import { getListProducts } from '../../services/api';

export default function useListProducts() {
  const listProducts = useQuery({
    queryKey: ['suggestion-products'],
    queryFn: () => getListProducts({ page: 1, limit: 1000 }),
    staleTime: 10 * 1000,
    select: (data) =>
      data.data.data.products.map((item) => {
        return {
          id: item.id,
          name: item.title,
        };
      }),
  });
  return { listProducts };
}
