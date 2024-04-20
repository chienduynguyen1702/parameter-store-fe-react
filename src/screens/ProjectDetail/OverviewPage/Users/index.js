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
  } = useProjectUserList(id);
  // console.log(listUsers);
  const {
    listUsers :orgListUsers,
  } =useListUsers();
  // console.log("orgListUsers :",orgListUsers)
  // const {
  //   archivedList,
  //   isSuccess: isListArchivedSuccess,
  //   isLoading: isListArchivedLoading,
  //   search,
  //   handleSearch,
  //   archiveMutation,
  //   unarchiveMutation,
  // } = useListArchived({
  //   archivedObject: {
  //     listArchivedAPI: getArchivedUsers,
  //     archiveAPI: archiveUser,
  //     unarchiveAPI: unarchiveUser,
  //     keyArchivistList: 'user-archivist-list',
  //     keyList: 'users',
  //     title: 'User',
  //   },
  // });

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
            id={editedItemId}
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
              {/* <Archived
                title="Archived users"
                name="users"
                archivedList={archivedList}
                isSuccess={isListArchivedSuccess}
                isLoading={isListArchivedLoading}
                search={search}
                handleSearch={handleSearch}
                unarchiveMutation={unarchiveMutation}
              /> */}
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
          // archiveMutation={archiveMutation}
        />
      </Card>
    </>
  );
};

export default UsersPage;
