import { useState } from 'react';

import { ImportUpload } from '../../../../../components';

import ImportPreviewContents from './ImportPreviewContents';

const ImportFlow = ({ cancelModal, isUploadStep, setIsUploadStep }) => {
  const listColumnName = [
    'video id',
    'product sku',
    'product name',
    // 'product impressions',
    // 'product clicks',
    // 'ctr',
    'video revenue',
    'unit sales',
    'orders',
    'buyers',
    'est commission',
    'refunds',
    'product refunds',
    // 'co rate',
    // 'vv',
  ];

  const [data, setData] = useState();

  return (
    <>
      {isUploadStep ? (
        <ImportUpload
          title="Import Content"
          module="contents"
          data={data}
          setData={setData}
          listColumn={listColumnName}
          navigateToPreview={() => setIsUploadStep(false)}
          setHideModalImport={cancelModal}
        />
      ) : (
        <ImportPreviewContents
          data={data}
          goBack={() => setIsUploadStep(true)}
          cancelModal={() => {
            cancelModal();
            setIsUploadStep(true);
          }}
        />
      )}
    </>
  );
};

export default ImportFlow;
