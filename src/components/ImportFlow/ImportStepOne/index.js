import React, { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import cn from 'classnames';
import styles from '../ImportFlow.module.sass';

import { Card, ModalWithoutPortal } from '../../';

import RHFFile from '../RHFCustom/RHFFile';

import ConfirmField from '../ConfirmField';
import DownloadTemplateButton from '../DownloadTemplateButton';

export default function ImportStepOne({
  title,
  data,
  setData,
  listColumn,
  module = 'products' || 'users' || 'liquidations' || 'pamperings',
  handleNewSettings,
  isSettingMode,
  setIsSettingMode,
  navigateCancel = '/products',
  children,
}) {
  const navigate = useNavigate();

  // Handle data title excel
  const [titleExcel, setTitleExcel] = useState(null);

  // Default values for columns title excel
  const [defaultValues, setDefaultValues] = useState([]);

  // Submit form go to setting form if have new type or category
  // else go to step 2
  const handlePreview = () => {
    if (data) {
      // format data to array of object
      const result = data?.map((item) => {
        const headerLines = titleExcel.length;
        let row = {};
        listColumn.forEach((column, key) => {
          // Formatted Column required
          const formattedColumn = column?.replace(/\s/g, '_');

          // Find index of column in row Excel
          // titleExcel[0] is main header column
          // defaultValues[key] is name column in Excel
          const indexColumnExcel = titleExcel[0]?.findIndex(
            (currValue) =>
              currValue?.toLowerCase() === defaultValues[key]?.toLowerCase(),
          );

          if (indexColumnExcel >= 0) {
            if (
              headerLines === 1 ||
              (titleExcel[0][indexColumnExcel] &&
                titleExcel[1] &&
                !titleExcel[1][indexColumnExcel])
            ) {
              row[formattedColumn] = item[indexColumnExcel] ?? null;
            } else if (
              titleExcel[0][indexColumnExcel] &&
              titleExcel[0][indexColumnExcel]
            ) {
              if (titleExcel[1]) {
                let indexSubTitle = 0;
                row[formattedColumn] = {};
                do {
                  const valueCell = item[indexColumnExcel + indexSubTitle];
                  const subTitle = titleExcel[1][
                    indexColumnExcel + indexSubTitle
                  ]?.replace(/\s/g, '_');
                  row[formattedColumn][subTitle] =
                    (typeof valueCell === 'string'
                      ? valueCell?.trim()
                      : valueCell) ?? null;
                  indexSubTitle++;
                } while (titleExcel[0][indexColumnExcel + indexSubTitle] === '');
              }
            }
          }
        });
        return row;
      });

      handleNewSettings(result);
    } else {
      toast.warning('Please select the file');
    }
  };

  const method = useForm();
  return (
    <>
      <ModalWithoutPortal
        outerClassName={cn(styles.outer, isSettingMode && styles.outerSetting)}
        visible={isSettingMode}
        onClose={() => setIsSettingMode(false)}
      >
        {children}
      </ModalWithoutPortal>
      <Card className={styles.rounded} title={title} classTitle="title-red">
        <DownloadTemplateButton module={module} />
        <FormProvider {...method}>
          <form onSubmit={method.handleSubmit(handlePreview)}>
            <RHFFile
              name="upload"
              label="Upload"
              tooltip="Upload file (CSV or XLSX)"
              title="Click or drop file (CSV or XLSX)"
              className="mb-1"
              setData={setData}
              setTitleExcel={setTitleExcel}
            />

            {titleExcel && (
              <ConfirmField
                label="Confirm Field"
                tooltip="Select the respective field"
                titleExcel={titleExcel}
                defaultValues={defaultValues}
                listColumn={listColumn}
                setDefaultValues={setDefaultValues}
              />
            )}

            <Stack className="mt-4" direction="horizontal" gap={3}>
              <p
                className={cn('button-white')}
                onClick={() => navigate(navigateCancel)}
              >
                Cancel
              </p>
              <button className="button ms-auto">Preview</button>
            </Stack>
          </form>
        </FormProvider>
      </Card>
    </>
  );
}
