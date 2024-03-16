import { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../../useQueryString';
import { getListUser } from '../../../services/api';
import { PARAMETERS } from '../../mocks/parameters';
import moment from 'moment';

const DEFAULT_QUERY_STRING = {
  page: 1,
  limit: 10,
};

const useListParameters = (defaultParams) => {
  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  const parseData = useCallback((data) => {
    const parameters = PARAMETERS?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        value: item.value,
        stage: {
          name: item.stage.name,
          color: item.stage.color,
        },
        environment: {
          name: item.environment.name,
          color: item.environment.color,
        },
        createdAt: moment(item.created_at).format('DD/MM/YYYY'),
        updatedAt: moment(item.updated_at).format('DD/MM/YYYY'),
      };
    });

    const pagination = {
      total: data.pagination.total,
      currentPage: data.pagination.currentPage,
      totalPage: data.pagination.totalPage,
      limit: data.pagination.limit,
    };
    return { pagination, parameters };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['projects', queryString],
    queryFn: () => getListUser(queryString),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit,
  });

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(DEFAULT_QUERY_STRING);
    }
  }, [limit, page, queryString, setQueryString]);

  return {
    listParameters: data?.parameters,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
  };
};

export default useListParameters;
