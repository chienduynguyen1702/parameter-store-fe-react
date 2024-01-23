import { toast } from 'react-toastify';
import { Stack } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import cn from 'classnames';
import styles from './Setting.module.sass';

import { AsyncButton, Card, RHFLabel } from '../../../../../components';
import { sleep } from '../../../../../utils/helpers';

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
      data?.newPic?.map((pic) => ({
        type: 'pampering-pic',
        color: '#6F767E',
        name: pic,
      })) || []
    )
      .concat(
        data?.newCategory?.map((category) => ({
          type: 'pampering-category',
          color: '#6F767E',
          name: category,
        })) || [],
      )
      .concat(
        data?.newStatus?.map((status) => ({
          type: 'pampering-status',
          color: '#6F767E',
          name: status,
        })) || [],
      );

    // Post to database and update cache
    addListSettingsMutation.mutate(newSettings, {
      onSuccess: async () => {
        sleep(2000);
        queryClient.invalidateQueries('pampering-category');
        queryClient.invalidateQueries('pampering-pic');
        queryClient.invalidateQueries('pampering-status');
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
          {data?.newCategory?.length > 0 && (
            <div className={styles.newType}>
              <RHFLabel
                classLabel={styles.titleNewType}
                label="New Type"
                tooltip="New type will automatically be added to the list of types"
              />
              <div className={styles.tableSettings}>
                {data?.newCategory?.map((newCategory, index) => (
                  <p
                    key={index}
                    className={cn('status-green-white')}
                    style={{ backgroundColor: '#6F767E' }}
                  >
                    {newCategory}
                  </p>
                ))}
              </div>
            </div>
          )}
          {data?.newPic?.length > 0 && (
            <div className={styles.newType}>
              <RHFLabel
                classLabel={styles.titleNewType}
                label="New PIC"
                tooltip="New PIC will automatically be added to the list of categories"
              />
              <div className={styles.tableSettings}>
                {data?.newPic?.map((newPIC, index) => (
                  <p
                    key={index}
                    className={cn('status-green-white')}
                    style={{ backgroundColor: '#6F767E' }}
                  >
                    {newPIC}
                  </p>
                ))}
              </div>
            </div>
          )}
          {data?.newStatus?.length > 0 && (
            <div className={styles.newType}>
              <RHFLabel
                classLabel={styles.titleNewType}
                label="New Status"
                tooltip="New status will automatically be added to the list of categories"
              />
              <div className={styles.tableSettings}>
                {data?.newStatus?.map((newStatus, index) => (
                  <p
                    key={index}
                    className={cn('status-green-white')}
                    style={{ backgroundColor: '#6F767E' }}
                  >
                    {newStatus}
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
