import React, { useCallback, useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMatch, useOutletContext, useParams } from 'react-router';
import { Stack } from 'react-bootstrap';

import {
  Item,
  RHFTextInput,
  RHFCheckbox,
  AsyncButton,
} from '../../../../components';

import { onInvalidSubmit } from '../../../../utils/helpers';
import { AddRoleSchema } from '../../../../utils/ValidateSchema';

import useRoleFormQuery from './useRoleFormQuery';

const RoleForm = () => {
  const { id } = useParams();

  const addRoleMatch = useMatch('/user-setting/roles/add-role');
  const isAddMode = useMemo(() => Boolean(addRoleMatch), [addRoleMatch]);

  const { onClose } = useOutletContext();

  const { permissionsQuery, rolesQuery, addRoleMutation, editRoleMutation } =
    useRoleFormQuery({ isAddMode, id });

  // Handle Submit Form
  const handleSubmit = useCallback(
    (data) => {
      const permissionIds = permissionsQuery.data
        .filter((permission) => data[permission.name])
        .map((permission) => permission.id);

      const body = {
        name: data.name,
        description: data.description,
        permissions: permissionIds,
      };

      if (isAddMode) {
        addRoleMutation.mutate(body, {
          onSuccess: () => {
            onClose();
          },
        });
      } else {
        editRoleMutation.mutate(
          { id, data: body },
          {
            onSuccess: () => {
              onClose();
            },
          },
        );
      }
    },
    [
      addRoleMutation,
      editRoleMutation,
      id,
      isAddMode,
      onClose,
      permissionsQuery.data,
    ],
  );

  const method = useForm({
    resolver: yupResolver(AddRoleSchema),
  });

  useEffect(() => {
    if (rolesQuery.isSuccess) {
      method.reset(rolesQuery.data);
    }
  }, [rolesQuery.data, method, rolesQuery.isSuccess]);

  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleSubmit, onInvalidSubmit)}>
        <div>
          <Item
            title={`${isAddMode ? 'Add' : 'Edit'} Role`}
            classTitle="title-yellow"
          >
            <div className={'borderTop pt-4'}>
              <RHFTextInput
                name="name"
                label="Name"
                type="text"
                placeholder="Enter role name"
                tooltip="Role name is required"
              />
            </div>
            <div className={' borderTop pt-4'}>
              <RHFTextInput
                name="description"
                label="Description"
                type="text"
                placeholder="Enter role description"
                tooltip="Role description is required"
              />
            </div>
            <div className={'borderBottom borderTop pt-3 pb-2'}>
              <p className="pb-2 font14">Permissions</p>

              {permissionsQuery.isSuccess &&
                permissionsQuery?.data?.map((permission) => (
                  <RHFCheckbox
                    key={permission.id}
                    name={permission.name}
                    content={permission.description}
                  />
                ))}
            </div>
          </Item>
        </div>

        <Stack direction="horizontal" className="mt-4">
          <p onClick={onClose} className="button-white ms-auto me-2">
            Cancel
          </p>
          <AsyncButton
            notMaxWidth
            type="submit"
            className="button px-4"
            value={'Save'}
            loading={addRoleMutation.isLoading || editRoleMutation.isLoading}
          />
        </Stack>
      </form>
    </FormProvider>
  );
};

export default RoleForm;
