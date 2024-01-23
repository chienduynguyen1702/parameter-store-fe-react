import { useState } from 'react';

import { ImportUpload } from '../../../../components';

import ImportPreviewKOC from './ImportPreviewKOC';

const ImportFlow = ({ cancelModal, isUploadStep, setIsUploadStep }) => {
  const listColumnName = [
    'username',
    'email',
    'platform',
    'tiktok id',
    // 'facebook id',
    'instagram id',
    // 'youtube id',
    'hashtag',
    'address',
    'phone',
    'category',
    'tier',
    'date of birth',
  ];

  const [data, setData] = useState();

  return (
    <>
      {isUploadStep ? (
        <ImportUpload
          title="Import KOCs"
          module="users"
          data={data}
          setData={setData}
          listColumn={listColumnName}
          navigateToPreview={() => setIsUploadStep(false)}
          setHideModalImport={cancelModal}
        />
      ) : (
        <ImportPreviewKOC
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
