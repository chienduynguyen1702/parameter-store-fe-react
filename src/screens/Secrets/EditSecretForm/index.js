import React from 'react';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Item from '../../../components/Item';

import {
  RHFTextInput,
  AsyncButton,
  Decentralization,
  RHFDropdown,
} from '../../../components';

import { AddSecretSchema } from '../../../utils/ValidateSchema';
import { editSecret, getListProjects } from '../../../services/api';

const EditSecretForm = ({ itemId, defaultValues, onClose }) => {
  const queryClient = useQueryClient();

  const editSecretMutation = useMutation(
    (data) => {
      return editSecret(itemId, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['secrets'],
        });
        onClose();
        toast.success('Edit secret successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  const projectQuery = useQuery({
    queryKey: ['projects'],
    queryFn: () => {
      return getListProjects({
        page: 1,
        limit: 100,
      });
    },
    select: (data) =>
      data.data.data.result.map((item) => ({ id: item.id, label: item.name })),
  });

  const handleSubmit = async (data) => {
    return editSecretMutation.mutate(data);
  };

  const method = useForm({
    resolver: yupResolver(AddSecretSchema),
    defaultValues,
  });

  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleSubmit)}>
        <Item
          title={'Add Secret'}
          className="pb-4 borderBottom"
          classTitle="title-green"
        >
          <div>
            <RHFTextInput
              name="name"
              label="Name"
              type="text"
              placeholder="Enter Name"
              tooltip="Name is required"
            />
            <RHFTextInput
              name="value"
              label="Value"
              type="text"
              placeholder="Enter value"
            />
            <RHFTextInput
              name="description"
              label="Description"
              type="text"
              placeholder="Enter description"
            />
            <RHFDropdown
              name="project_id"
              label="Project Name"
              defaultValue="Select project"
              data={projectQuery.isSuccess ? projectQuery.data : []}
            />
          </div>
        </Item>

        <div className="pt-5 d-flex justify-content-end align-items-center">
          <div>
            <p onClick={onClose} className={'button-white me-2'}>
              Cancel
            </p>
          </div>
          <Decentralization permissions={['user-update', 'user-create']}>
            <div>
              <AsyncButton
                threeDotsWidth="20"
                threeDotsHeight="20"
                type="submit"
                className="button px-4"
                value="Save"
                notMaxWidth
                loading={editSecretMutation.isLoading}
              />
            </div>
          </Decentralization>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditSecretForm;
