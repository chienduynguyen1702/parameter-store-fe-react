import React, { useState } from 'react';

import {
  Card,
  Modal,
  FormSearch,
  ButtonAdd,
  // Archived,
} from '../../../components';

import Table from './Table';
import { useListRoles } from '../../../hooks/data';
// import {
//   archiveRole,
//   getArchivedRoles,
//   unarchiveRole,
// } from '../../../services/api';

function Roles() {
  const [isAddMode, setIsAddMode] = useState(false);
  // const [editedItemId, setEditedItemId] = useState(undefined);

  const {
    listRoles,
    pagination,
    isSuccess: isListRolesSuccess,
    isLoading: isListRolesLoading,
  } = useListRoles();

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
  //     listArchivedAPI: getArchivedRoles,
  //     archiveAPI: archiveRole,
  //     unarchiveAPI: unarchiveRole,
  //     keyArchivistList: 'role-archivist-list',
  //     keyList: 'roles',
  //     title: 'Role',
  //   },
  // });

  // console.log('archivedList', archivedList);
  return (
    <>
      <Modal
        outerClassName="outerModal"
        visible={isAddMode}
        onClose={() => {
          setIsAddMode(false);
          // setEditedItemId(undefined);
        }}
      >
        {/* {isAddMode && <AddUserForm onClose={() => setIsAddMode(false)} />}
        {typeof editedItemId !== 'undefined' && (
          <EditUserForm
            id={editedItemId}
            onClose={() => setEditedItemId(undefined)}
          />
        )} */}
      </Modal>

      <Card
        title={`${isListRolesSuccess ? pagination?.total : '-'} Roles`}
        classTitle="title-purple"
        head={
          <>
            <FormSearch placeholder="Search by role" />
            <div className="d-flex">
              <ButtonAdd
                titleButton="Add Role"
                className="me-2"
                handleClickAdd={() => setIsAddMode(true)}
              />
              {/* <Archived
                title="Archived roles"
                name="roles"
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
          listRoles={listRoles}
          isSuccess={isListRolesSuccess}
          isLoading={isListRolesLoading}
          totalPage={pagination?.totalPage}
          // setEditedItemId={setEditedItemId}
          // archiveMutation={archiveMutation}
        />
      </Card>
    </>
  );
}

export default Roles;
