import React from 'react';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Item from '../../../components/Item';

import {
  RHFTextInput,
  AsyncButton,
  Decentralization,
} from '../../../components';

import { AddProjectSchema } from '../../../utils/ValidateSchema';
import { editProjectById } from '../../../services/api';

const EditProjectForm = ({ itemId, defaultValues, onClose }) => {
  const queryClient = useQueryClient();

  const editProjectMutation = useMutation(
    (data) => {
      return editProjectById(itemId, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['projects'],
        });
        onClose();
        toast.success('Edit project successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  const handleSubmit = async (data) => {
    return editProjectMutation.mutate(data);
  };

  const method = useForm({
    resolver: yupResolver(AddProjectSchema),
    defaultValues,
  });

  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleSubmit)}>
        <Item
          title={'Add Project'}
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
              name="description"
              label="Description"
              type="text"
              placeholder="Enter description"
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
                loading={editProjectMutation.isLoading}
              />
            </div>
          </Decentralization>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditProjectForm;
