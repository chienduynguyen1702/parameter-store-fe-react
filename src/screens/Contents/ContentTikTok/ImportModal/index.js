import { createContext, useCallback, useState } from 'react';

import cn from 'classnames';

import { Icon, ModalWithoutPortal } from '../../../../components';
import ImportFlow from './ImportFlow';
import { TailSpin } from 'react-loader-spinner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { importContents } from '../../../../services/api';
import { toast } from 'react-toastify';

const ImportContext = createContext(null);

const ImportModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [isUploadStep, setIsUploadStep] = useState(true);
  const [isImporting, setIsImporting] = useState(false);

  const importContentsMutation = useMutation((data) => importContents(data));

  const queryClient = useQueryClient();

  const handleImport = useCallback(
    (data) => {
      setShowModal(false);
      setIsUploadStep(true);
      setIsImporting(true);
      importContentsMutation.mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries('contents');
          setIsImporting(false);
          toast.success('Import contents successfully');
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
    [importContentsMutation, queryClient],
  );

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
        <ImportContext.Provider
          value={{
            handleImport: (data) => handleImport(data),
            isImportLoading: importContentsMutation.isLoading,
          }}
        >
          <ImportFlow
            cancelModal={() => setShowModal(false)}
            isUploadStep={isUploadStep}
            setIsUploadStep={setIsUploadStep}
          />
        </ImportContext.Provider>
      </ModalWithoutPortal>
      {!isImporting ? (
        <button
          className={cn('button-small')}
          onClick={() => setShowModal(true)}
        >
          <Icon name="upload" size="24" />
          Import Contents
        </button>
      ) : (
        <p
          className="button-small"
          style={{ opacity: 0.9, pointerEvents: 'none' }}
        >
          <TailSpin
            color="#ffffff"
            height="20"
            width="20"
            strokeWidth={6}
            strokeWidthSecondary={6}
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          Import Contents
        </p>
      )}
    </>
  );
};

export { ImportModal, ImportContext };
