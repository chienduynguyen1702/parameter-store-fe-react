import React, { useState, useEffect } from 'react';
import { ProgressBar, Stack } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';

import { AsyncButton, Card, RHFLabel } from '../../../components';
import useImportContent from '../../../hooks/Data/useImportContent';

import ConfirmField from './ConfirmField';
import DownloadTemplateButton from './DownloadTemplateButton';
import RHFFile from './RHFFile';

import styles from './ImportUpload.module.sass';
import cn from 'classnames';

export default function ImportUpload({
  title,
  data,
  setData,
  listColumn,
  module = 'users',
  isLoading = false,
  navigateToPreview,
  setHideModalImport,
}) {
  const [titleExcel, setTitleExcel] = useState(null);

  const [defaultValues, setDefaultValues] = useState([]);

  const [progress, setProgress] = useState(0);

  const { isImportContent, importProgress } = useImportContent();

  useEffect(() => {
    if (importProgress) setProgress(importProgress);
  }, [importProgress]);

  const handlePreview = () => {
    if (data) {
      const formatData = data?.map((item) => {
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
              if (typeof item[indexColumnExcel] === 'string') {
                item[indexColumnExcel] = item[indexColumnExcel].trim();
              }
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
                } while (
                  titleExcel[0][indexColumnExcel + indexSubTitle] === ''
                );
              }
            }
          }
        });
        return row;
      });
      setData(formatData);
      navigateToPreview();
    } else {
      toast.warning('Please select the file');
    }
  };

  const method = useForm();
  return (
    <Card className="p-0" title={title} classTitle="title-red">
      <DownloadTemplateButton module={module} />
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(handlePreview)}>
          {isImportContent ? (
            <div>
              <RHFLabel
                classLabel={styles.label}
                label={'Upload'}
                tooltip={'Upload file (CSV or XLSX)'}
              />
              <div className={styles.wrap}>
                <div
                  className={cn(
                    'button-small button-white-grey-border',
                    styles.btn,
                  )}
                >
                  <span className="me-2">
                    Updating {progress ? `${progress}%` : ''}
                  </span>
                  <ProgressBar
                    animated
                    now={progress}
                    className={styles.progress}
                  />
                </div>
              </div>
            </div>
          ) : (
            <RHFFile
              name="upload"
              label="Upload"
              tooltip="Upload file (CSV or XLSX)"
              title="Click or drop file (CSV or XLSX)"
              className="mb-1"
              setData={setData}
              setTitleExcel={setTitleExcel}
            />
          )}

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
            <p className="button-white" onClick={setHideModalImport}>
              Cancel
            </p>
            <AsyncButton
              loading={isLoading}
              type="submit"
              value="Preview"
              className="button ms-auto w-auto"
            />
          </Stack>
        </form>
      </FormProvider>
    </Card>
  );
}
