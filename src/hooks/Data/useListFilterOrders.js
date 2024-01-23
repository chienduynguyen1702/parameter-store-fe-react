import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getListOrders } from '../../services/api';

export default function useListFilterOrders() {
  const parseData = useCallback((data) => {
    const ordersCode = data.orders.map((item) => {
      return {
        id: item.id,
        text: item.delivery_code,
      };
    });
    const code = {};
    const uniqueOrdersCode = ordersCode.filter((item) => {
      return code.hasOwnProperty(item.text) ? false : (code[item.text] = true);
    });
    const ordersKOC = data.orders.map((item) => {
      return {
        id: item.id,
        text: item.koc_name,
      };
    });
    const koc = {};
    const uniqueOrdersKOC = ordersKOC.filter((item) => {
      return koc.hasOwnProperty(item.text) ? false : (koc[item.text] = true);
    });
    const ordersCity = data.orders.map((item) => {
      return {
        id: item.id,
        text: item.city,
      };
    });
    const city = {};
    const uniqueOrdersCity = ordersCity.filter((item) => {
      return city.hasOwnProperty(item.text) ? false : (city[item.text] = true);
    });

    return { uniqueOrdersCode, uniqueOrdersKOC, uniqueOrdersCity };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['orders-filter', { page: 1, limit: 1000 }],
    queryFn: () => getListOrders({ page: 1, limit: 1000 }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
  });

  return {
    listOrdersCode: data?.uniqueOrdersCode,
    listOrdersKOC: data?.uniqueOrdersKOC,
    listOrdersCity: data?.uniqueOrdersCity,
    isSuccess,
    isLoading,
  };
}
