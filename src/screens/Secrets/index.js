import React, { useState } from 'react';

import {
  Card,
  FormSearch,
  ModalWithoutPortal,
  ButtonAdd,
} from '../../components';

import Table from './Table';

import AddSecretForm from './AddSecretForm';

export default function SecretsPage() {
  const [total, setTotal] = useState(0);

  const [isAddMode, setIsAddMode] = useState(false);

  return (
    <>
      <ModalWithoutPortal
        outerClassName={'outerModal'}
        visible={isAddMode}
        onClose={() => setIsAddMode(false)}
      >
        <AddSecretForm onClose={() => setIsAddMode(false)} />
      </ModalWithoutPortal>
      <div className="d-flex mb-4 gap-2">
        <ButtonAdd
          handleClickAdd={() => setIsAddMode(true)}
          titleButton="Create Secret"
        />
      </div>

      <Card
        title={`Found ${total} secrets`}
        classTitle="title-purple"
        head={
          <>
            <FormSearch placeholder="Search by name or value" />
          </>
        }
      >
        <Table setTotal={setTotal} />
      </Card>
    </>
  );
}
