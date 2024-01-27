import React, { useState } from 'react';

import {
  Card,
  FormSearch,
  ModalWithoutPortal,
  ButtonAdd,
} from '../../components';

import Table from './Table';

import AddProjectForm from './AddProjectForm';

export default function ProjectsPage() {
  const [total, setTotal] = useState(0);

  const [isAddMode, setIsAddMode] = useState(false);

  return (
    <>
      <ModalWithoutPortal
        outerClassName={'outerModal'}
        visible={isAddMode}
        onClose={() => setIsAddMode(false)}
      >
        <AddProjectForm onClose={() => setIsAddMode(false)} />
      </ModalWithoutPortal>
      <div className="d-flex mb-4 gap-2">
        <ButtonAdd
          handleClickAdd={() => setIsAddMode(true)}
          titleButton="Create Project"
        />
      </div>

      <Card
        title={`Found ${total} Projects`}
        classTitle="title-purple"
        classCardHead="d-flex flex-wrap flex-row flex-lg-col gap-3"
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
