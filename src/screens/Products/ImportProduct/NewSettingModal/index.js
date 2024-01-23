import { toast } from 'react-toastify';
import { Stack } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';

import cn from 'classnames';
import styles from '../ImportProduct.module.sass';

import { AsyncButton, Card, RHFLabel } from '../../../../components';
import { useQueryClient } from '@tanstack/react-query';

export default function NewSettingsModal({
  addListSettingsMutation,
  data,
  handleCloseModal,
  addSettingSuccess,
}) {
  const queryClient = useQueryClient();

  const methodSettings = useForm();

  // Add new settings
  const handleNewSettings = async () => {
    // Add new type and category to newSettings
    const newSettings = await (
      data?.newType?.map((nameType) => ({
        type: 'product-type',
        color: '#6F767E',
        name: nameType,
      })) || []
    ).concat(
      data?.newCategory?.map((nameCategory) => ({
        type: 'product-category',
        color: '#6F767E',
        name: nameCategory,
      })) || [],
    );

    // Post to database and update cache
    addListSettingsMutation.mutate(newSettings, {
      onSuccess: () => {
        queryClient.invalidateQueries('product-type');
        queryClient.invalidateQueries('product-category');
        handleCloseModal();
        toast.success('Add new settings successfully');
        addSettingSuccess();
      },
    });
  };
  return (
    <Card
      className={cn(styles.rounded)}
      title="New settings"
      classTitle="title-red"
    >
      <FormProvider {...methodSettings}>
        <form onSubmit={methodSettings.handleSubmit(handleNewSettings)}>
          {data?.newType?.length > 0 && (
            <div className={styles.newType}>
              <RHFLabel
                classLabel={styles.titleNewType}
                label="New Type"
                tooltip="New type will automatically be added to the list of types"
              />
              <div className={styles.tableSettings}>
                {data?.newType?.map((newType, index) => (
                  <p
                    key={index}
                    className={cn('status-green-white')}
                    style={{ backgroundColor: '#6F767E' }}
                  >
                    {newType}
                  </p>
                ))}
              </div>
            </div>
          )}
          {data?.newCategory?.length > 0 && (
            <div className={styles.newType}>
              <RHFLabel
                classLabel={styles.titleNewType}
                label="New Category"
                tooltip="New category will automatically be added to the list of categories"
              />
              <div className={styles.tableSettings}>
                {data?.newCategory?.map((newType, index) => (
                  <p
                    key={index}
                    className={cn('status-green-white')}
                    style={{ backgroundColor: '#6F767E' }}
                  >
                    {newType}
                  </p>
                ))}
              </div>
            </div>
          )}
          <Stack className="mt-4" direction="horizontal" gap={3}>
            <p
              className="button-white ms-auto"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </p>
            <AsyncButton
              loading={addListSettingsMutation.isLoading}
              value="Confirm"
            />
          </Stack>
        </form>
      </FormProvider>
    </Card>
  );
}
