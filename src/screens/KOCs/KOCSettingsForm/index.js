import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  Card,
  ModalWithoutPortal,
  RHFColorInput,
  RHFTextInput,
  SettingItem,
} from '../../../components';
import SkeletonSettingsForm from './Skeleton';

import { useSettingsMutation, useSettingsUser } from '../../../hooks/Setting';

import { AddSettingSchema } from '../../../utils/ValidateSchema';

function KOCSettingsForm() {
  const queryClient = useQueryClient();

  const { userTiers, userCategories, userPlatforms } = useSettingsUser();

  const { addSettingMutation, editSettingMutation } = useSettingsMutation();

  // Handle id and current data of form in setting item
  const [id, setId] = useState(0);
  const [modalTitle, setModalTitle] = useState('Add New Tier');

  // Handle modal add and edit setting
  const [typeAdd, setTypeAdd] = useState('none');
  const [typeEdit, setTypeEdit] = useState('none');

  const handleCloseModal = () => {
    setTypeAdd('none');
    setTypeEdit('none');
  };

  const method = useForm({
    resolver: yupResolver(AddSettingSchema),
  });

  const handleSubmit = (data) => {
    if (typeAdd !== 'none') {
      const body = {
        color: data.color,
        type: typeAdd,
        name: data.name,
      };
      return addSettingMutation.mutate(body, {
        onSuccess: () => {
          queryClient.invalidateQueries(typeAdd);
          toast.success(`${modalTitle} Success`);
          handleCloseModal();
        },
      });
    }
    const body = {
      color: data.color,
      type: typeEdit,
      name: data.name,
    };
    return editSettingMutation.mutate(
      { id, data: body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(typeEdit);
          toast.success(`${modalTitle} Success`);
          handleCloseModal();
        },
      },
    );
  };

  return (
    <>
      <ModalWithoutPortal
        visible={typeAdd !== 'none' || typeEdit !== 'none'}
        onClose={handleCloseModal}
      >
        <Card
          className="p-0 roundedFull"
          title={modalTitle}
          classTitle="title-red"
        >
          <FormProvider {...method}>
            <form onSubmit={method.handleSubmit(handleSubmit)}>
              <RHFTextInput
                name="name"
                label="Name"
                type="text"
                placeholder="Enter name"
                tooltip="Name is required"
              />
              <RHFColorInput
                label="Color"
                name="color"
                tooltip="Color is required"
              />
              <Stack className="mt-4" direction="horizontal" gap={2}>
                <p className="button-white ms-auto">Reset</p>
                <button className="button">Apply</button>
              </Stack>
            </form>
          </FormProvider>
        </Card>
      </ModalWithoutPortal>
      <Card className="p-0 roundedFull" title="Settings" classTitle="title-red">
        <div className="pt-3">
          {userTiers.isLoading && <SkeletonSettingsForm count={4} />}
          {userTiers.isSuccess && (
            <SettingItem
              title="Tier"
              titleButton="Add New Tier"
              onAdd={() => {
                method.reset({});
                setModalTitle('Add New Tier');
                setTypeAdd('user-tier');
                setTypeEdit('none');
              }}
              onEdit={(data) => {
                method.reset(data);
                setId(data.id);
                setModalTitle('Edit Tier');
                setTypeEdit('user-tier');
                setTypeAdd('none');
              }}
              data={userTiers.data}
            />
          )}
          {userCategories.isLoading && <SkeletonSettingsForm count={4} />}
          {userCategories.isSuccess && (
            <SettingItem
              title="Category"
              titleButton="Add New Category"
              onAdd={() => {
                method.reset({});
                setModalTitle('Add New Category');
                setTypeAdd('user-category');
                setTypeEdit('none');
              }}
              onEdit={(data) => {
                method.reset(data);
                setId(data.id);
                setModalTitle('Edit Category');
                setTypeEdit('user-category');
                setTypeAdd('none');
              }}
              data={userCategories.data}
            />
          )}
          {userPlatforms.isLoading && <SkeletonSettingsForm count={4} />}
          {userPlatforms.isSuccess && (
            <SettingItem
              title="Platform"
              titleButton="Add New Platform"
              onAdd={() => {
                method.reset({});
                setModalTitle('Add New Platform');
                setTypeAdd('user-platform');
                setTypeEdit('none');
              }}
              onEdit={(data) => {
                setId(data);
                method.reset(data);
                setId(data.id);
                setModalTitle('Edit Platform');
                setTypeEdit('user-platform');
                setTypeAdd('none');
              }}
              data={userPlatforms.data}
            />
          )}
        </div>
      </Card>
    </>
  );
}

export default KOCSettingsForm;
