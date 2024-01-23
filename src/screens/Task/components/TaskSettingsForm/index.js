import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import cn from 'classnames';
import styles from './TaskSettingsForm.module.sass';

import {
  Card,
  ModalWithoutPortal,
  RHFColorInput,
  RHFTextInput,
  SettingItem,
} from '../../../../components';

import { AddSettingSchema } from '../../../../utils/ValidateSchema';
import {
  useSettingsMutation,
  useSettingsTask,
} from '../../../../hooks/Setting';

function TaskSettingsForm() {
  // Handle id and current data of form in setting item
  const [id, setId] = useState(0);
  const [modalTitle, setModalTitle] = useState('Add New Tier');

  const queryClient = useQueryClient();

  const { taskPlatforms, taskTypes, taskStatus, taskHashtags } =
    useSettingsTask();

  const { addSettingTaskMutation, editSettingTaskMutation } =
    useSettingsMutation();

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
      return addSettingTaskMutation.mutate(body, {
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
    return editSettingTaskMutation.mutate(
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
        {/* Update user-platform */}
        <SettingItem
          isLoading={taskPlatforms.isLoading}
          title="Platform"
          titleButton="Add New Platform"
          onAdd={() => {
            method.reset({});
            setModalTitle('Add New Platform');
            setTypeAdd('user-platform');
            setTypeEdit('none');
          }}
          onEdit={(data) => {
            method.reset(data);
            setId(data.id);
            setModalTitle('Edit Platform');
            setTypeEdit('user-platform');
            setTypeAdd('none');
          }}
          data={taskPlatforms.data}
        />
        {/* Update task-type  */}
        <SettingItem
          isLoading={taskTypes.isLoading}
          title="Type"
          titleButton="Add New Type"
          onAdd={() => {
            method.reset({});
            setModalTitle('Add New Type');
            setTypeAdd('task-type');
            setTypeEdit('none');
          }}
          onEdit={(data) => {
            method.reset(data);
            setId(data.id);
            setModalTitle('Edit Type');
            setTypeEdit('task-type');
            setTypeAdd('none');
          }}
          data={taskTypes.data}
        />
        {/* Update task-status */}
        <SettingItem
          isLoading={taskStatus.isLoading}
          title="Status"
          titleButton="Add New Status"
          onAdd={() => {
            method.reset({});
            setModalTitle('Add New Status');
            setTypeAdd('task-status');
            setTypeEdit('none');
          }}
          onEdit={(data) => {
            method.reset(data);
            setId(data.id);
            setModalTitle('Edit Status');
            setTypeEdit('task-status');
            setTypeAdd('none');
          }}
          data={taskStatus.data}
        />
        {/* Update hashtag */}
        <SettingItem
          isLoading={taskHashtags.isLoading}
          title="Hashtag"
          titleButton="Add New Hashtag"
          onAdd={() => {
            method.reset({});
            setModalTitle('Add New Hashtag');
            setTypeAdd('hashtag');
            setTypeEdit('none');
          }}
          onEdit={(data) => {
            method.reset(data);
            setId(data.id);
            setModalTitle('Edit Hashtag');
            setTypeEdit('hashtag');
            setTypeAdd('none');
          }}
          data={taskHashtags.data}
        />
      </Card>
    </>
  );
}

export default TaskSettingsForm;
