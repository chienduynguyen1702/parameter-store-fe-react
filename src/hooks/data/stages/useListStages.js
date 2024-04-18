import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import useQueryString from '../../useQueryString';
import { addStage, editStage, getProjectStages, deleteStage } from '../../../services/api';
import { toast } from 'react-toastify';

const DEFAULT_QUERY_STRING = {
  page: 1,
  limit: 10,
};

const useListStages = (project_id) => {
  // const {id}  = useParams();
  const queryClient = useQueryClient();
  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(DEFAULT_QUERY_STRING);
    }
  }, [limit, page, queryString, setQueryString]);

  const parseData = useCallback((data) => {
    const stages = data?.stages.map((item) => {
      return {
        name: item?.name,
        id: item?.ID,
        description: item?.description,
        // workflow_name: item.workflow_name,
        // last_used: item.last_used,
      };
    });

    const pagination = {
      total: stages.length,
      currentPage: 1,
      totalPage: Math.ceil(stages.length/10),
      limit: 10,
    };
    return { pagination, stages };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['stages', queryString],
    queryFn: () => getProjectStages(project_id),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
    enabled: !!page && !!limit,
  });

  const addStageMutation = useMutation(
    (data) => {
      return addStage(data.project_id, data.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['stages'],
        });
        toast.success('Add stage successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  const editStageMutation = useMutation(
    (body) => {
      return editStage(body.project_id, body.stage_id, body.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['stages'],
        });
        toast.success('Edit stage successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  // const deleteStageMutation = useMutation(
  //   (id) => {
  //     return deleteStage(id);
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({
  //         queryKey: ['stages'],
  //       });
  //       toast.success('Delete stage successfully');
  //     },
  //     onError: (error) => {
  //       toast.error(error.response.data.message, {
  //         autoClose: 5000,
  //       });
  //     },
  //   },
  // );

  return {
    listStages: data?.stages,
    pagination: data?.pagination,
    isSuccess,
    isLoading,
    addStageMutation,
    editStageMutation,
  };
};

export default useListStages;
