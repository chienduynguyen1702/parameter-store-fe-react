import React, { useState, useMemo, useCallback } from 'react';
import { useMatch, useNavigate, Outlet } from 'react-router-dom';

import cn from 'classnames';

import {
  Card,
  Archived,
  Decentralization,
  FormSearch,
  ModalWithoutPortal,
  ButtonExport,
  ButtonAdd,
} from '../../../components';

import Table from './Table';
import ArchivedUsers from './ArchivedUsers';

import useQueryString from '../../../hooks/useQueryString';
import useExport from '../../../hooks/Export/useExport';

export default function Users() {
  const navigate = useNavigate();

  const { queryString, parseQueryString } = useQueryString();

  const [totalUsers, setTotalUsers] = useState(0);

  //------------------Handle modal add or edit user------------------------
  const addUserMatch = useMatch('/user-setting/users/add-user');
  const isAddMode = useMemo(() => addUserMatch !== null, [addUserMatch]);

  const editUserMatch = useMatch('/user-setting/users/edit-user/:id');
  const isEditMode = useMemo(() => editUserMatch !== null, [editUserMatch]);

  // ------------------Handle modal import user------------------------
  const importStep1Match = useMatch('/user-setting/users/import/1');
  const isImportStep1Mode = useMemo(
    () => importStep1Match !== null,
    [importStep1Match],
  );

  const importStep2Match = useMatch('/user-setting/users/import/2');
  const isImportStep2Mode = useMemo(
    () => importStep2Match !== null,
    [importStep2Match],
  );

  const handleCloseModal = useCallback(() => {
    navigate({
      pathname: '/user-setting/users',
      search: `?${parseQueryString(queryString)}`,
    });
  }, [navigate, parseQueryString, queryString]);

  const navigateToAddUser = useCallback(
    () =>
      navigate({
        pathname: '/user-setting/users/add-user',
        search: `?${parseQueryString(queryString)}`,
      }),
    [navigate, parseQueryString, queryString],
  );

  const { handleClickExport, isLoadingExport } = useExport({
    exportedObject: 'users',
  });

  return (
    <>
      <Decentralization
        permissions={['user-create', 'user-one', 'user-update', 'user-import']}
        exact
      >
        <ModalWithoutPortal
          outerClassName={cn(
            'outerModal',
            isImportStep1Mode && 'outerSettingModal',
            isImportStep2Mode && 'outerDetail',
          )}
          visible={
            isAddMode || isEditMode || isImportStep1Mode || isImportStep2Mode
          }
          onClose={handleCloseModal}
        >
          <Outlet
            context={{
              onClose: handleCloseModal,
            }}
          />
        </ModalWithoutPortal>
      </Decentralization>
      <div className="d-flex mb-4 gap-2">
        <Decentralization permissions={['user-create']} exact>
          <ButtonAdd
            handleClickAdd={navigateToAddUser}
            titleButton="Add User"
          />
        </Decentralization>
      </div>
      <Decentralization
        permissions={['user-list', 'user-archivist-list', 'user-export']}
        exact
      >
        <Card
          title={`${totalUsers} Users`}
          classTitle="title-purple"
          classCardHead="d-flex flex-wrap flex-row flex-lg-col gap-3"
          head={
            <>
              <FormSearch placeholder="Search by name or email" />
              <div className="d-flex">
                <Decentralization permissions={['user-archivist-list']} exact>
                  <Archived title={'Archived users'}>
                    <ArchivedUsers />
                  </Archived>
                </Decentralization>
                <Decentralization permissions={['user-export']} exact>
                  <ButtonExport
                    isLoading={isLoadingExport}
                    handleClickExport={handleClickExport}
                  />
                </Decentralization>
              </div>
            </>
          }
        >
          <Decentralization permissions={['user-list']} exact>
            <Table setTotalUsers={setTotalUsers} />
          </Decentralization>
        </Card>
      </Decentralization>
    </>
  );
}
