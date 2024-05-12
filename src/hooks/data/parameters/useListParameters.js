import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import useQueryString from '../../useQueryString';
import {
  addParameter,
  editParameter,
  getListParameter,
  getStages,
  getEnvironments,
  getVersions,
} from '../../../services/api';
// import { PARAMETERS } from '../../mocks/parameters';
import moment from 'moment';
import { toast } from 'react-toastify';
import { number } from 'yup';

const DEFAULT_QUERY_STRING = {
  page: 1,
  limit: 10,
};

const useListParameters = (project_id) => {
  const { id } = useParams();
  if (!project_id) {
    project_id = id;
  }
  const queryClient = useQueryClient();
  const { queryString, setQueryString } = useQueryString();

  const { page, limit } = queryString;

  useEffect(() => {
    if (!page || !limit) {
      setQueryString(DEFAULT_QUERY_STRING);
    }
  }, [limit, page, queryString, setQueryString]);

  const parseData = useCallback((data) => {
    const parameters = data?.map((item) => {
      return {
        id: item.ID,
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
        createdAt: moment(item.CreatedAt).format('DD/MM/YYYY'),
        updatedAt: moment(item.UpdatedAt).format('DD/MM/YYYY'),
        isApplied: item.is_applied,
        description: item.description,
      };
    });
    const pagination = {
      total: parameters?.length || 0,
      currentPage: 1,
      totalPage: Math.ceil((parameters?.length || 0) / 10),
      limit: 10,
    };
    return { pagination, parameters };
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['projects', queryString],
    queryFn: () => getListParameter(project_id),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.parameters),
    enabled: !!page && !!limit,
  });

  const addParameterMutation = useMutation(
    (data) => {
      return addParameter(data.project_id, data.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['parameters'],
        });
        toast.success(
          'Add parameter successfully! Start rerun cicd to apply changes.',
        );
      },
      onError: (error) => {
        // if 500 internal server error
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  const editParameterMutation = useMutation(
    (data) => {
      return editParameter(data.project_id, data.parameter_id, data.data);
    },
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: ['parameters'],
        });
        console.log('editParameterMutation response:', response);
        const successMessage = response.data.message;
        toast.success(successMessage, {
          autoClose: 10000,
        });
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 10000,
        });
      },
    },
  );
  ////////////////////////// Get stages //////////////////////////
  const parseStages = useCallback((data) => {
    const stages = data?.map((stage) => {
      // console.log("stage:", stage)
      return {
        id: stage.ID,
        name: stage.name,
        description: stage.description,
        color: stage.color,
      };
    });
    return stages;
  }, []);

  const { data: stages } = useQuery({
    queryKey: ['stages'],
    queryFn: () => getStages(),
    select: (data) => parseStages(data.data.stages),
    staleTime: 10 * 1000,
    enabled: true,
  });

  ////////////////////////// Get environments //////////////////////////
  const parseEnvironments = useCallback((data) => {
    const environments = data?.map((env) => {
      // console.log("env:", env)
      return {
        id: env.ID,
        name: env.name,
        description: env.description,
        color: env.color,
      };
    });
    return environments;
  }, []);

  const { data: environments } = useQuery({
    queryKey: ['environments'],
    queryFn: () => getEnvironments(),
    select: (data) => parseEnvironments(data.data.environments),
    staleTime: 10 * 1000,
    enabled: true,
  });
  ////////////////////////// Get versions //////////////////////////
  const parseVersions = useCallback((data) => {
    const versions = data?.map((version) => {
      // console.log("version:", version)
      return {
        id: version.ID,
        name: version.name,
        number: version.number,
        description: version.description,
        color: version.color,
      };
    });
    return versions;
  }, []);

  const { data: versions } = useQuery({
    queryKey: ['versions'],
    queryFn: () => getVersions(project_id),
    select: (data) => parseVersions(data.data.versions),
    staleTime: 10 * 1000,
    enabled: true,
  });

  return {
    listParameters: data?.parameters,
    pagination: data?.pagination,
    stages,
    environments,
    versions,
    isSuccess,
    isLoading,
    addParameterMutation,
    editParameterMutation,
  };
};

export default useListParameters;
