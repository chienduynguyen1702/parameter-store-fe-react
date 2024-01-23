import { useState } from 'react';

import cn from 'classnames';

import { ButtonImport, ModalWithoutPortal } from '../../../components';
import ImportFlow from './ImportFlow';

const ImportModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [isUploadStep, setIsUploadStep] = useState(true);

  return (
    <>
      <ModalWithoutPortal
        visible={showModal}
        onClose={() => {
          setShowModal(false);
          setIsUploadStep(true);
        }}
        outerClassName={cn(!isUploadStep && 'outerDetail')}
      >
        <ImportFlow
          cancelModal={() => setShowModal(false)}
          isUploadStep={isUploadStep}
          setIsUploadStep={setIsUploadStep}
        />
      </ModalWithoutPortal>
      <ButtonImport
        titleButton="Import"
        handleClickImport={() => setShowModal(true)}
      />
    </>
  );
};

export default ImportModal;
