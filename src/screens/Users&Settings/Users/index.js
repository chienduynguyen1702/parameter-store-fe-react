import React, { useState } from 'react';

import {
  Card,
  FormSearch,
  ButtonAdd,
  Modal,
  Archived,
} from '../../../components';

import Table from './Table';
import {
  archiveUser,
  getArchivedUsers,
  unarchiveUser,
} from '../../../services/api';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import { useListArchived, useListUsers } from '../../../hooks/data';

export default function Users() {
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
      listArchivedAPI: getArchivedUsers,
      archiveAPI: archiveUser,
      unarchiveAPI: unarchiveUser,
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
        {isAddMode && <AddUserForm onClose={() => setIsAddMode(false)} />}
        {typeof editedItemId !== 'undefined' && (
          <EditUserForm
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
}
