import { toast } from 'react-toastify';
import { Stack } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';

import cn from 'classnames';
import styles from '../ImportLiquidation.module.sass';

import { AsyncButton, Card, RHFLabel } from '../../../../components';

export default function NewSettingsModal({
  addListSettingsMutation,
  data,
  handleCloseModal,
  addSettingSuccess,
}) {
  const methodSettings = useForm();

  // Add new settings
  const handleNewSettings = async () => {
    // Add new type and category to newSettings
    const newSettings = await (
      data?.newCategory?.map((nameCategory) => ({
        type: 'liquidation-category',
        color: '#6F767E',
        name: nameCategory,
      })) || []
    )
      .concat(
        data?.newStatus?.map((nameStatus) => ({
          type: 'liquidation-status',
          color: '#6F767E',
          name: nameStatus,
        })) || [],
      )
      .concat(
        data?.newPIC?.map((namePIC) => ({
          type: 'liquidation-pic',
          color: '#6F767E',
          name: namePIC,
        })) || [],
      );

    // Post to database and update cache
    addListSettingsMutation.mutate(newSettings, {
      onSuccess: () => {
        handleCloseModal();
        toast.success('Add new settings successfully');
        addSettingSuccess();
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
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
                label="New Category"
                tooltip="New category will automatically be added to the list of types"
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
          {data?.newPIC?.length > 0 && (
            <div className={styles.newType}>
              <RHFLabel
                classLabel={styles.titleNewType}
                label="New PIC"
                tooltip="New pic will automatically be added to the list of categories"
              />
              <div className={styles.tableSettings}>
                {data?.newPIC?.map((newPIC, index) => (
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
