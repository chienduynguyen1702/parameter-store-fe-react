import React, { useState } from 'react';

import { ButtonAdd, Card, FormSearch, Archived, Modal } from '../../components';

import Table from './components/Table/Table';
import AddProjectForm from './components/AddProjectForm/AddProjectForm';
import EditProjectForm from './components/EditProjectForm/EditProjectForm';

import { useListUsers, useListArchived } from '../../hooks/data';
import {
  archiveProject,
  getArchivedProjects,
  unarchiveProject,
} from '../../services/api';

const ProjectsPage = () => {
  const [isAddMode, setIsAddMode] = useState(false);
  const [editedItemId, setEditedItemId] = useState(undefined);

  const { pagination, isSuccess: isListUsersSuccess } = useListUsers();

  const {
    archivedList,
    isSuccess: isListArchivedSuccess,
    isLoading,
    search,
    handleSearch,
    archiveMutation,
    unarchiveMutation,
  } = useListArchived({
    archivedObject: {
      listArchivedAPI: getArchivedProjects,
      archiveAPI: archiveProject,
      unarchiveAPI: unarchiveProject,
      keyArchivistList: 'user-archivist-list',
      keyList: 'users',
      title: 'User',
    },
  });

  return (
    <>
      <Modal
        outerClassName={'outerModal'}
        visible={isAddMode || typeof editedItemId !== 'undefined'}
        onClose={() => {
          setIsAddMode(false);
          setEditedItemId(undefined);
        }}
      >
        {isAddMode && <AddProjectForm onClose={() => setIsAddMode(false)} />}
        {typeof editedItemId !== 'undefined' && (
          <EditProjectForm
            id={editedItemId}
            onClose={() => setEditedItemId(undefined)}
          />
        )}
      </Modal>
      <div className="d-flex mb-4 gap-2">
        <ButtonAdd
          handleClickAdd={() => setIsAddMode(true)}
          titleButton="Add User"
        />
      </div>

      <Card
        title={`${isListUsersSuccess ? pagination?.total : '-'} Users`}
        classTitle="title-purple"
        head={
          <>
            <FormSearch placeholder="Search by name" />
            <div className="d-flex">
              <Archived
                title="Archived users"
                archivedList={archivedList}
                isSuccess={isListArchivedSuccess}
                isLoading={isLoading}
                search={search}
                handleSearch={handleSearch}
                unarchiveMutation={unarchiveMutation}
              />
            </div>
          </>
        }
      >
        <Table
          setEditedItemId={setEditedItemId}
          archiveMutation={archiveMutation}
        />
      </Card>
    </>
  );
};

export default ProjectsPage;
