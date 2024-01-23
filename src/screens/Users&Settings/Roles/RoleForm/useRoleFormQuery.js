import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

import {
  addRole,
  editRole,
  getListPermission,
  getRole,
} from '../../../../services/api';

const useRoleFormQuery = ({ isAddMode = false, id }) => {
  const queryClient = useQueryClient();

  // Query Permissions
  const permissionsQuery = useQuery({
    queryKey: ['permissions'],
    queryFn: () => {
      return getListPermission();
    },
    select: (data) => {
      return data.data.data.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
      }));
    },
  });

  // Add Role Mutation
  const addRoleMutation = useMutation(
    (data) => {
      return addRole(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['roles'],
        });
        toast.success('Add role successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    },
  );

  // Edit Role Mutation
  const editRoleMutation = useMutation(
    ({ id, data }) => {
      return editRole(id, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['roles'],
        });
        toast.success('Edit role successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    },
  );

  // Handle Data in Query Roles
  const parseData = useCallback(
    (data) => {
      const permissionsKeys = {};
      permissionsQuery.data.forEach((permission) => {
        permissionsKeys[permission.name] = data.permissions.some(
          (item) => item.name === permission.name,
        );
      });

      return {
        id: data.id,
        name: data.name,
        description: data.description,
        ...permissionsKeys,
      };
    },
    [permissionsQuery.data],
  );

  // Query Roles
  const rolesQuery = useQuery({
    queryKey: ['role', id],
    queryFn: () => {
      return getRole(id);
    },
    enabled: !isAddMode && permissionsQuery.isSuccess,
    select: (data) => parseData(data.data.data),
  });

  return {
    permissionsQuery,
    rolesQuery,
    addRoleMutation,
    editRoleMutation,
  };
};

export default useRoleFormQuery;
