import React, { useState } from 'react';
import { Stack } from 'react-bootstrap';

import cn from 'classnames';
import { RotatingLines } from 'react-loader-spinner';

import { AsyncButton, ButtonExport, Card, Icon } from '../../../components';

import { exportExcel } from '../../../utils/helpers';
import { exportToExcel } from '../../../components/Import/ImportUpload/DownloadTemplateButton';

export default function ImportPreview({
  title,
  successData,
  failedData,
  isTestLoading = false,
  isImportLoading,
  handleImport,
  handleFailedRowDownload,
  cancelModal,
  goBack,
  children,
}) {
  const [activeTab, setActiveTab] = useState('Success');

  return (
    <Card title={title} classTitle="title-green">
      <Stack className="mt-4" direction="horizontal" gap={3}>
        <p style={{ height: '40px' }} className="button-white" onClick={goBack}>
          <Icon name="arrow-left" />
          Import other file
        </p>

        <div className="d-flex align-items-center">
          {/* <p className={cn(styles.titleImport)}>
            {data?.length || 0} {data?.length <= 0 ? 'row' : 'rows'}{' '}
          </p> */}
          {/* <div className="ms-2">
            {errorRowCount > 0 && (
              <div className={cn(styles.errorProduct, 'fs-7')}>
                {errorRowCount} {errorRowCount <= 1 ? 'error' : 'errors'}
              </div>
            )}
          </div> */}
        </div>
      </Stack>
      <div className="d-flex justify-content-between pt-3">
        <div className="d-flex">
          <button
            className={`allOrMeButton ${
              activeTab === 'Success' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('Success')}
          >
            Success ({successData.length})
          </button>
          <button
            className={`allOrMeButton ${activeTab === 'Fail' ? 'active' : ''}`}
            onClick={() => setActiveTab('Fail')}
          >
            Fail ({failedData.length})
          </button>
          {isTestLoading && (
            <div className="d-flex align-items-center ms-2">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
              />
              <span className="ms-2" style={{ color: '#6F767E' }}>
                Processing data...
              </span>
            </div>
          )}
        </div>
        <ButtonExport
          className={`${(isTestLoading || activeTab === 'Fail') && 'disabled'}`}
          titleExport="Download Failed Rows"
          handleClickExport={() => {
            const downloadData = handleFailedRowDownload() ?? failedData;
            if (downloadData.length > 0) {
              if (title === 'Import KOCs') {
                exportToExcel(downloadData, 'Failed ' + title);
              } else exportExcel(downloadData, 'Failed ' + title);
            }
          }}
        />
      </div>

      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          data: activeTab === 'Success' ? successData : failedData,
          // isLoading: isTestLoading,
        });
      })}

      <Stack className="mt-4" direction="horizontal" gap={3}>
        <p className={cn('button-white ms-auto')} onClick={cancelModal}>
          Cancel
        </p>
        <AsyncButton
          loading={isImportLoading}
          className={`button ${activeTab === 'Fail' ? 'disabled' : ''} ${
            successData.length === 0 && 'disabled'
          } ${isTestLoading && 'disabled'}`}
          value="Import"
          onClick={handleImport}
          notMaxWidth
        />
      </Stack>
    </Card>
  );
}
