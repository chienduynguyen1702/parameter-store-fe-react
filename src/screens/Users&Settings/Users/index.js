import React, { useState } from 'react';

import { Card, FormSearch, ButtonAdd, Modal } from '../../../components';

import Table from './Table';

export default function Users() {
  const [total, setTotal] = useState(0);

  const [isAddMode, setIsAddMode] = useState(false);

  const onCloseModel = () => {
    setIsAddMode(false);
  };

  const onOpenModel = () => {
    setIsAddMode(true);
  };

  return (
    <>
      <Modal
        outerClassName={'outerModal'}
        visible={isAddMode}
        onClose={onCloseModel}
      >
        {/* User form  */}
      </Modal>
      <div className="d-flex mb-4 gap-2">
        <ButtonAdd handleClickAdd={onOpenModel} titleButton="Add User" />
      </div>

      <Card
        title={`${total} Users`}
        classTitle="title-purple"
        head={
          <>
            <FormSearch placeholder="Search by name or email" />
            {/* <div className="d-flex">
              <Archived title={'Archived users'}>
                    <ArchivedUsers />
                  </Archived>
              <ButtonExport
                    isLoading={isLoadingExport}
                    handleClickExport={handleClickExport}
                  />
            </div> */}
          </>
        }
      >
        <Table setTotal={setTotal} />
      </Card>
    </>
  );
}
