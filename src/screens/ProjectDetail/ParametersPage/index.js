import React, { useState } from 'react';

import {
  ButtonAdd,
  Card,
  FormSearch,
  Archived,
  Modal,
  FiltersCustom,
  RHFInputSelect,
} from '../../../components';

import Table from './components/Table/Table';
import AddParameterForm from './components/AddParameterForm';
import EditParameterForm from './components/EditParameterForm';
import FormFilter from './components/FormFilter';

import { useListParameters, useListArchived } from '../../../hooks/data';
import {
  archiveParameter,
  getArchivedParameters,
  unarchiveParameter,
} from '../../../services/api';
import { VERSIONS } from '../../../hooks/mocks/versions';

const ParametersPage = () => {
  const [isAddMode, setIsAddMode] = useState(false);
  const [editedItemId, setEditedItemId] = useState(undefined);

  const {
    listParameters,
    isLoading: isListParametersLoading,
    isSuccess: isListUsersSuccess,
    pagination,
  } = useListParameters();

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
      listArchivedAPI: getArchivedParameters,
      archiveAPI: archiveParameter,
      unarchiveAPI: unarchiveParameter,
      keyArchivistList: 'parameter-archivist-list',
      keyList: 'parameters',
      title: 'Parameter',
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
        {isAddMode && <AddParameterForm onClose={() => setIsAddMode(false)} />}
        {typeof editedItemId !== 'undefined' && (
          <EditParameterForm
            id={editedItemId}
            onClose={() => setEditedItemId(undefined)}
          />
        )}
      </Modal>

      <Card
        title={`${isListUsersSuccess ? pagination?.total : '-'} Parameters`}
        classTitle="title-purple"
        head={
          <>
            <FormSearch placeholder="Search by name" />
            <div className="d-flex">
              <FiltersCustom className="me-2">
                <FormFilter />
              </FiltersCustom>
              <ButtonAdd
                handleClickAdd={() => setIsAddMode(true)}
                titleButton="Add Parameter"
                className="me-2"
              />
              <Archived
                title="Archived Parameters"
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
          listParameters={listParameters}
          isSuccess={isListUsersSuccess}
          isLoading={isListParametersLoading}
          totalPage={pagination?.totalPage}
          setEditedItemId={setEditedItemId}
          archiveMutation={archiveMutation}
        />
      </Card>
    </>
  );
};

export default ParametersPage;
