import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';

import {
  Card,
  ModalWithoutPortal,
  RHFColorInput,
  RHFTextInput,
  SettingItem,
} from '../../../../../components';
import { STAGES } from '../../../../../hooks/mocks/stages';

function SettingsForm() {
  const queryClient = useQueryClient();

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

  const method = useForm({});

  // const handleSubmit = (data) => {
  //   if (typeAdd !== 'none') {
  //     const body = {
  //       color: data.color,
  //       type: typeAdd,
  //       name: data.name,
  //     };
  //     return addSettingMutation.mutate(body, {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries(typeAdd);
  //         toast.success(`${modalTitle} Success`);
  //         handleCloseModal();
  //       },
  //     });
  //   }
  //   const body = {
  //     color: data.color,
  //     type: typeEdit,
  //     name: data.name,
  //   };
  //   return editSettingMutation.mutate(
  //     { id, data: body },
  //     {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries(typeEdit);
  //         toast.success(`${modalTitle} Success`);
  //         handleCloseModal();
  //       },
  //     },
  //   );
  // };

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
            <form
            // onSubmit={method.handleSubmit(handleSubmit)}
            >
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
      <Card
        className="p-0 roundedFull"
        title="Stages and Environments"
        classTitle="title-red"
      >
        <div className="pt-3">
          <SettingItem
            title="Stages"
            titleButton="Add Stage"
            onAdd={() => {
              method.reset({});
              setModalTitle('Add New Stages');
              setTypeAdd('user-Stages');
              setTypeEdit('none');
            }}
            onEdit={(data) => {
              method.reset(data);
              setId(data.id);
              setModalTitle('Edit Stages');
              setTypeEdit('user-Stages');
              setTypeAdd('none');
            }}
            data={STAGES}
          />
        </div>
        <div className="pt-3">
          <SettingItem
            title="Environments"
            titleButton="Add Environment"
            onAdd={() => {
              method.reset({});
              setModalTitle('Add New Environments');
              setTypeAdd('user-Environments');
              setTypeEdit('none');
            }}
            onEdit={(data) => {
              method.reset(data);
              setId(data.id);
              setModalTitle('Edit Environments');
              setTypeEdit('user-Environments');
              setTypeAdd('none');
            }}
            data={STAGES}
          />
        </div>
      </Card>
    </>
  );
}

export default SettingsForm;
