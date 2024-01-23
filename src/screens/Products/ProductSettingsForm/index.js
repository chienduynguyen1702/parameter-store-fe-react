import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import SkeletonSettingsForm from './Skeleton';
import { useSettingsProduct } from '../../../hooks/Setting';

import cn from 'classnames';
import styles from './ProductsSettingsForm.module.sass';

import {
  Card,
  ModalWithoutPortal,
  RHFColorInput,
  RHFTextInput,
  SettingItem,
} from '../../../components';

import { AddSettingSchema } from '../../../utils/ValidateSchema';

function ProductSettingsForm() {
  // Handle id and current data of form in setting item
  const [id, setId] = useState(0);
  const [modalTitle, setModalTitle] = useState('Add New Tier');

  // React Query with useListSetting hook
  const {
    productTypes,
    productCategories,
    addSettingMutation,
    editSettingMutation,
  } = useSettingsProduct();
  const queryClient = useQueryClient();

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
        onError: (error) => {
          toast.error(error.response.data.message, {
            autoClose: 5000,
          });
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
        onError: (error) => {
          toast.error(error.response.data.message, {
            autoClose: 5000,
          });
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
        {productCategories.isLoading && <SkeletonSettingsForm count={4} />}
        {productCategories.isSuccess && (
          <div className="mt-2">
            <SettingItem
              title="Category"
              titleButton="Add New Category"
              onAdd={() => {
                method.reset({});
                setModalTitle('Add New Category');
                setTypeAdd('product-category');
                setTypeEdit('none');
              }}
              onEdit={(data) => {
                method.reset(data);
                setId(data.id);
                setModalTitle('Edit Category');
                setTypeEdit('product-category');
                setTypeAdd('none');
              }}
              data={productCategories.data}
            />
          </div>
        )}
        {productTypes.isLoading && <SkeletonSettingsForm count={4} />}
        {productTypes.isSuccess && (
          <SettingItem
            title="Type"
            titleButton="Add New Type"
            onAdd={() => {
              method.reset({});
              setModalTitle('Add New Type');
              setTypeAdd('product-type');
              setTypeEdit('none');
            }}
            onEdit={(data) => {
              method.reset(data);
              setId(data.id);
              setModalTitle('Edit Type');
              setTypeEdit('product-type');
              setTypeAdd('none');
            }}
            data={productTypes.data}
          />
        )}
        <Stack className="mt-4" direction="horizontal" gap={3}>
          <button className="button ms-auto">Apply</button>
        </Stack>
      </Card>
    </>
  );
}

export default ProductSettingsForm;
