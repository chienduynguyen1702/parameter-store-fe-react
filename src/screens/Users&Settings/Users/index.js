import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';

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
import { toast } from 'react-toastify';

const UsersPage = () => {
  const [isAddMode, setIsAddMode] = useState(false);
  const [editedItemId, setEditedItemId] = useState(undefined);
  const { me } = useContext(AuthContext);
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
  // console.log('me', me);
  const roleRequired = 'Organization Admin';
  const handleAddUserClick = () => {
    if (me.isOrganizationAdmin) {
      setIsAddMode(true);
    } else {
      toast.error('You are not authorized to perform this action');
    }
  };
  const handleClickEdit = (editedItemId) => {
    if (!me.isOrganizationAdmin) {
      setEditedItemId(undefined);
      toast.error('You are not authorized to perform this action');
    } else {
      setEditedItemId(editedItemId);
    }
  };
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
        {/* if me.isOrganizationAdmin then be able to render modal, else run toast */}
        <>
          {isAddMode && <AddUserForm onClose={() => setIsAddMode(false)} />}
          {typeof editedItemId !== 'undefined' && (
            <EditUserForm
              editedItemId={editedItemId}
              onClose={() => setEditedItemId(undefined)}
              handleClickEdit={handleClickEdit}
            />
          )}
        </>
      </Modal>

      <Card
        title={`${isListUsersSuccess ? pagination?.total : '-'} Users`}
        classTitle="title-purple"
        head={
          <>
            <FormSearch placeholder="Search by name" />
            <div className="d-flex">
              <ButtonAdd
                handleClickAdd={handleAddUserClick}
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
          setEditedItemId={handleClickEdit}
          archiveMutation={archiveMutation}
          roleRequired={roleRequired}
        />
      </Card>
    </>
  );
};

export default UsersPage;
