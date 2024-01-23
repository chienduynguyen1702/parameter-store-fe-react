import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import cn from 'classnames';
import styles from './FormSettings.module.sass';

import Icon from '../../../../../../../components/Icon';
import { AddSettingSchema } from '../../../../../../../utils/ValidateSchema';
import SkeletonSettingsForm from './Skeleton';

import {
  Card,
  ModalWithoutPortal,
  RHFColorInput,
  RHFTextInput,
  SettingItem,
} from '../../../../../../../components';

export default function FormSettings({
  parentFc,
  userPlatforms,
  userType,
  addSettingMutation,
  editSettingMutation,
}) {
  const [id, setId] = useState(0);
  const [modalTitle, setModalTitle] = useState('Add New Tier');

  const queryClient = useQueryClient();

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
        outerClassName={cn(styles.outer, styles.notPadding)}
        visible={typeAdd !== 'none' || typeEdit !== 'none'}
        onClose={handleCloseModal}
        modalClassName="p-0"
      >
        <Card
          className={cn(styles.rounded)}
          title={modalTitle}
          classTitle="title-red text-nowrap"
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
      <Card
        className={styles.rounded}
        title="Settings"
        classTitle="title-red"
        head={
          <button className={styles.close} onClick={() => parentFc(false)}>
            <Icon name="close" size="20" />
          </button>
        }
      >
        {userPlatforms.isLoading && <SkeletonSettingsForm count={4} />}
        {userPlatforms.isSuccess && (
          <div className="mt-3">
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
          </div>
        )}
        {userType.isLoading && <SkeletonSettingsForm count={4} />}
        {userType.isSuccess && (
          <SettingItem
            title="Type"
            titleButton="Add New Type"
            onAdd={() => {
              method.reset({});
              setModalTitle('Add New Type');
              setTypeAdd('user-post-type');
              setTypeEdit('none');
            }}
            onEdit={(data) => {
              method.reset(data);
              setId(data.id);
              setModalTitle('Edit type');
              setTypeEdit('user-post-type');
              setTypeAdd('none');
            }}
            data={userType.data}
          />
        )}
      </Card>
    </>
  );
}
