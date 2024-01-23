import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';

import cn from 'classnames';
import styles from './FormFilter.module.sass';

import {
  RHFCheckbox,
  RHFDate,
  RHFDropdown,
  RHFTagInput,
  RHFLabel,
} from '../../../../../../components';

import useFormFilter from './useFormFilter';

export default function FormFilter({ parentFc }) {
  const {
    platformsQuery,
    typesQuery,
    statusQuery,
    productsQuery,
    defaultValues,
    handleSubmit,
    onClose,
  } = useFormFilter({ parentFc });

  const method = useForm({ defaultValues });

  return (
    <div className={styles.list}>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(handleSubmit)}>
          <div className={cn(styles.item)}>
            <div className={styles.checkboxBorder}>
              <RHFLabel
                label="Platform"
                tooltip="Search and filter by Platform"
              />
              {platformsQuery.isSuccess &&
                platformsQuery.data.map((platform) => (
                  <RHFCheckbox
                    key={platform.id}
                    name={platform.id}
                    content={platform.name}
                    className={'text-dark'}
                  />
                ))}
            </div>

            <div className={styles.checkboxBorder}>
              <RHFLabel label="Type" tooltip="Search and filter by Type" />
              {typesQuery.isSuccess &&
                typesQuery.data.map((type) => (
                  <RHFCheckbox
                    key={type.id}
                    name={type.id}
                    content={type.name}
                    className={'text-dark'}
                  />
                ))}
            </div>

            <div className={styles.checkboxBorder}>
              <RHFLabel label="Status" tooltip="Search and filter by Status" />
              {statusQuery.isSuccess &&
                statusQuery.data.map((status) => (
                  <RHFCheckbox
                    key={status.id}
                    name={status.id}
                    content={status.name}
                    className={'text-dark'}
                  />
                ))}
            </div>
            <RHFTagInput
              className="pt-3"
              label="Hashtag"
              name="hashtags"
              placeholder=" Press enter to add a hashtag"
              tooltip="Search and filter by Hashtag"
              notRequiredInSuggestions
            />
            <RHFDropdown
              name="affiliatePlatform"
              label="Affiliate Platform"
              defaultValue="Select Affiliate Platform"
              data={['Ecomobi', 'TikTokShop']}
              tooltip="Search and filter by Platform"
            />
            {productsQuery.isSuccess && (
              <RHFTagInput
                name="products"
                label="Products"
                placeholder="Enter Product Name"
                suggestions={productsQuery?.data}
                tooltip="Search and filter by Product"
              />
            )}
            <RHFDate
              label="From"
              tooltip="Select the starting date"
              className="borderBottom borderTop pt-3"
              nameDate="from"
            />
            <RHFDate
              label="To"
              tooltip="Select the ending date"
              className="borderBottom mt-3"
              nameDate="to"
            />
          </div>

          <Stack direction="horizontal">
            <p
              onClick={() => {
                method.reset();
                onClose();
              }}
              className={cn(
                'button-white-grey-border ms-auto me-2',
                styles.btn,
              )}
            >
              Reset
            </p>
            <button className={cn('button', styles.btn)}>Apply</button>
          </Stack>
        </form>
      </FormProvider>
    </div>
  );
}
