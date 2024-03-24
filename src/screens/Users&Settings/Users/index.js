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

const UsersPage = () => {
  const [isAddMode, setIsAddMode] = useState(false);
  const [editedItemId, setEditedItemId] = useState(undefined);

  const {
    listUsers,
    pagination,
    isSuccess: isListUsersSuccess,
    isLoading: isListUsersLoading,
  } = useListUsers();

  const {
    archivedList,
    isSuccess: isListArchivedSuccess,
    isLoading: isListArchivedLoading,
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

      <Card
        title={`${isListUsersSuccess ? pagination?.total : '-'} Users`}
        classTitle="title-purple"
        head={
          <>
            <FormSearch placeholder="Search by name" />
            <div className="d-flex">
              <ButtonAdd
                handleClickAdd={() => setIsAddMode(true)}
                titleButton="Add User"
                className="me-2"
              />
              <Archived
                title="Archived users"
                name="users"
                archivedList={archivedList}
                isSuccess={isListArchivedSuccess}
                isLoading={isListArchivedLoading}
                search={search}
                handleSearch={handleSearch}
                unarchiveMutation={unarchiveMutation}
              />
            </div>
          </>
        }
      >
        <Table
          listUsers={listUsers}
          isSuccess={isListUsersSuccess}
          isLoading={isListUsersLoading}
          totalPage={pagination?.totalPage}
          setEditedItemId={setEditedItemId}
          archiveMutation={archiveMutation}
        />
      </Card>
    </>
  );
};

export default UsersPage;
