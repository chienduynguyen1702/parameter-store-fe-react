import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Card, Modal, FormSearch, ButtonAdd } from '../../../components';

import Table from './Table';

function Roles() {
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
        outerClassName="outerModal"
        visible={isAddMode}
        onClose={onCloseModel}
      >
        <Outlet
          context={{
            onClose: onCloseModel,
          }}
        />
      </Modal>
      <div className="mb-4">
        <ButtonAdd titleButton="Add Role" handleClickAdd={onOpenModel} />
      </div>

      <Card
        // title={`${total} Roles`}
        title={`3 Roles`}
        classTitle="title-purple"
        head={
          <>
            <FormSearch placeholder="Search by role" />
            {/* <div>
                  <Archived title={'Archived roles'}>
                    <ArchivedRoles />
                  </Archived>
              </div> */}
          </>
        }
      >
        <Table setTotal={setTotal} />
      </Card>
    </>
  );
}

export default Roles;
