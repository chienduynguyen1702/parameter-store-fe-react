import React, { useState, useMemo, useCallback } from 'react';
import { useMatch, useNavigate, Outlet } from 'react-router-dom';

import {
  Card,
  Modal,
  Decentralization,
  Archived,
  FormSearch,
  ButtonAdd,
} from '../../../components';

import Table from './Table';
import ArchivedRoles from './ArchivedRoles';

import useQueryString from '../../../hooks/useQueryString';

function Roles() {
  const navigate = useNavigate();

  const { queryString, parseQueryString } = useQueryString();

  const [totalRoles, setTotalRoles] = useState(0);

  //------------------Handle modal add or edit role------------------------
  const addRoleMatch = useMatch('/user-setting/roles/add-role');
  const isAddMode = useMemo(() => addRoleMatch !== null, [addRoleMatch]);

  const editRoleMatch = useMatch('/user-setting/roles/edit-role/:id');
  const isEditMode = useMemo(() => editRoleMatch !== null, [editRoleMatch]);

  const handleCloseModal = useCallback(() => {
    navigate({
      pathname: '/user-setting/roles',
      search: `?${parseQueryString(queryString)}`,
    });
  }, [navigate, parseQueryString, queryString]);

  const openAddUserForm = useCallback(() => {
    navigate({
      pathname: '/user-setting/roles/add-role',
      search: `?${parseQueryString(queryString)}`,
    });
  }, [navigate, parseQueryString, queryString]);

  return (
    <>
      <Decentralization
        permissions={['role-one', 'role-create', 'role-update']}
      >
        <Modal
          outerClassName="outerModal"
          visible={isAddMode || isEditMode}
          onClose={handleCloseModal}
        >
          <Outlet
            context={{
              onClose: handleCloseModal,
            }}
          />
        </Modal>
      </Decentralization>
      <Decentralization permissions={['role-create']} exact>
        <div className="mb-4">
          <ButtonAdd titleButton="Add Role" handleClickAdd={openAddUserForm} />
        </div>
      </Decentralization>

      <Decentralization permissions={['role-list', 'role-archivist-list']}>
        <Card
          title={`${totalRoles} Roles`}
          classTitle="title-purple"
          head={
            <>
              <FormSearch placeholder="Search by role" />
              <div>
                <Decentralization permissions={['role-archivist-list']}>
                  <Archived title={'Archived roles'}>
                    <ArchivedRoles />
                  </Archived>
                </Decentralization>
              </div>
            </>
          }
        >
          <Decentralization permissions={['role-list']} exact>
            <Table setTotalRoles={setTotalRoles} />
          </Decentralization>
        </Card>
      </Decentralization>
    </>
  );
}

export default Roles;
