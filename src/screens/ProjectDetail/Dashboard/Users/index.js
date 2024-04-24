import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Card,
  FormSearch,
  ButtonAdd,
  Modal,
  Archived,
} from '../../../../components';

import Table from './Table';
import {
  archiveUser,
  getArchivedUsers,
  unarchiveUser,
} from '../../../../services/api';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import { useListArchived,useListUsers, useProjectUserList } from '../../../../hooks/data';

const UsersPage = () => {

  const { id } = useParams();
  const [isAddMode, setIsAddMode] = useState(false);
  const [editedItemId, setEditedItemId] = useState(undefined);

  const {
    listUsers,
    pagination,
    isSuccess: isListUsersSuccess,
    isLoading: isListUsersLoading,
    removeUserMutation,
  } = useProjectUserList(id);
  
  const {
    listUsers :orgListUsers,
  } =useListUsers();

  const handleRemoveUser = (userId) => {
    removeUserMutation.mutate({ project_id: id, user_id: userId },
      {
        onSuccess: () => {
          console.log('remove user success');
        },
        onError: () => {
          console.log('remove user error');
        },
      }
    );
  }

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
        {isAddMode && <AddUserForm 
                      onClose={() => setIsAddMode(false)} 
                      listUsers={orgListUsers}
                      />}
        {typeof editedItemId !== 'undefined' && (
          <EditUserForm
            editedItemId={editedItemId}
            onClose={() => setEditedItemId(undefined)}
          />
        )}
      </Modal>

      <Card
        title={`${isListUsersSuccess ? pagination?.total : '0'} Users`}
        classTitle="title-blue"
        className={'mb-5'}
        head={
          <>
            <FormSearch placeholder="Search by name" />
            <div className="d-flex">
              <ButtonAdd
                handleClickAdd={() => setIsAddMode(true)}
                titleButton="Add User"
                className="me-2"
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
          handleRemoveUser={handleRemoveUser}
        />
      </Card>
    </>
  );
};

export default UsersPage;
