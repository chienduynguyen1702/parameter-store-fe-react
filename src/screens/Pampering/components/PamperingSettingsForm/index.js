import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import cn from 'classnames';
import styles from './PamperingSettingsForm.module.sass';

import {
  Card,
  ModalWithoutPortal,
  RHFColorInput,
  RHFTextInput,
  SettingItem,
} from '../../../../components';

import { AddSettingSchema } from '../../../../utils/ValidateSchema';
import {
  useSettingsPampering,
  useSettingsMutation,
} from '../../../../hooks/Setting';

function PamperingSettingsForm() {
  const queryClient = useQueryClient();

  const { pamperingCategories, pamperingPICs, pamperingStatus } =
    useSettingsPampering();

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

  // Handle form
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
        outerClassName={styles.outer}
        visible={typeAdd !== 'none' || typeEdit !== 'none'}
        onClose={handleCloseModal}
      >
        <Card
          className={cn(styles.rounded)}
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
              <Stack className="mt-4" direction="horizontal" gap={3}>
                <p className="button-white ms-auto">Reset</p>
                <button className="button">Apply</button>
              </Stack>
            </form>
          </FormProvider>
        </Card>
      </ModalWithoutPortal>
      <Card className={styles.rounded} title="Settings" classTitle="title-red">
        {/* Update pampering-category */}
        <SettingItem
          isLoading={pamperingCategories.isLoading}
          title="Category"
          titleButton="Add New Category"
          onAdd={() => {
            method.reset({});
            setModalTitle('Add New Category');
            setTypeAdd('pampering-category');
            setTypeEdit('none');
          }}
          onEdit={(data) => {
            method.reset(data);
            setId(data.id);
            setModalTitle('Edit Category');
            setTypeEdit('pampering-category');
            setTypeAdd('none');
          }}
          data={pamperingCategories.data}
        />
        {/* Update pampering-status */}
        <SettingItem
          isLoading={pamperingStatus.isLoading}
          title="Status"
          titleButton="Add New Status"
          onAdd={() => {
            method.reset({});
            setModalTitle('Add New Status');
            setTypeAdd('pampering-status');
            setTypeEdit('none');
          }}
          onEdit={(data) => {
            method.reset(data);
            setId(data.id);
            setModalTitle('Edit Status');
            setTypeEdit('pampering-status');
            setTypeAdd('none');
          }}
          data={pamperingStatus.data}
        />
        {/* Update pampering-pic  */}
        <SettingItem
          isLoading={pamperingPICs.isLoading}
          title="P.I.C"
          titleButton="Add New P.I.C"
          onAdd={() => {
            method.reset({});
            setModalTitle('Add New P.I.C');
            setTypeAdd('pampering-pic');
            setTypeEdit('none');
          }}
          onEdit={(data) => {
            method.reset(data);
            setId(data.id);
            setModalTitle('Edit P.I.C');
            setTypeEdit('pampering-pic');
            setTypeAdd('none');
          }}
          data={pamperingPICs.data}
        />
      </Card>
    </>
  );
}

export default PamperingSettingsForm;
