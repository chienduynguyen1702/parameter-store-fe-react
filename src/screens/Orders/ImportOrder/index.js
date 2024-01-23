import { useState } from 'react';

import styles from './ImportOrder.module.sass';

import { Card, ModalWithoutPortal } from '../../../components';

import ImportFile from './ImportFile';
import PreviewData from './PreviewData';
import { useOutletContext } from 'react-router';

function ImportOrder() {
  const { onClose } = useOutletContext();
  const [data, setData] = useState();
  const [step, setStep] = useState(1);
  return (
    <ModalWithoutPortal
      outerClassName={`${step === 1 ? 'outerSettingsModal' : 'outerModal'}`}
      visible={true}
      onClose={onClose}
    >
      <Card
        className={styles.rounded}
        title="Import Orders"
        classTitle="title-red"
      >
        {step === 1 && (
          <ImportFile setData={setData} goNextStep={() => setStep(2)} />
        )}
        {step === 2 && (
          <PreviewData data={data} goPrevStep={() => setStep(1)} />
        )}
      </Card>
    </ModalWithoutPortal>
  );
}

export default ImportOrder;
