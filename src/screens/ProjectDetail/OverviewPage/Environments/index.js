import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  ButtonAdd,
  Card,
  FormSearch,
  Archived,
  Modal,
} from '../../../components';

import Table from './components/Table/Table';
import AddEnvironmentForm from './components/AddEnvironmentForm';
import EditEnvironmentForm from './components/EditEnvironmentForm';

import { useListEnvironmentsArchived, useListEnvironments } from '../../../../hooks/data';
import {
  archiveEnvironment,
  getArchivedEnvironments,
  unarchiveEnvironment,
} from '../../../../services/api';

const EnvironmentPage = () => {
  const { id } = useParams();
  const [isAddMode, setIsAddMode] = useState(false);
  const [editedItemId, setEditedItemId] = useState(undefined);
  const {
    listEnvironments,
    pagination,
    isLoading: isListEnvironmentsLoading,
    isSuccess: isListEnvironmentsSuccess,
    addEnvironmentMutation,
    editEnvironmentMutation,
  } = useListEnvironments(id);
  const {
    archivedList,
    isSuccess: isListArchivedSuccess,
    isLoading,
    search,
    handleSearch,
    archiveMutation,
    unarchiveMutation,
  } = useListEnvironmentsArchived({
    archivedEnvironment: {
      listArchivedAPI: getArchivedEnvironments,
      archiveAPI: archiveEnvironment,
      unarchiveAPI: unarchiveEnvironment,
      keyArchivistList: 'agent-archivist-list',
      keyList: 'agents',
      title: 'Environment',
      project_id: id,
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
        {isAddMode && 
          <AddEnvironmentForm 
            project_id={id}
            onClose={() => setIsAddMode(false)} 
            environments={environments}
          />}
        {typeof editedItemId !== 'undefined' && (
          <EditEnvironmentForm
            project_id={id}
            editedItemId={editedItemId}
            onClose={() => setEditedItemId(undefined)}
            environments={environments}
          />
        )}
      </Modal>

      <Card
        title={`${isListEnvironmentsSuccess ? pagination?.total : '0'} Environments`}
        classTitle="title-purple"
        head={
          <>
            <FormSearch placeholder="Search by name" />
            <div className="d-flex">
              <ButtonAdd
                handleClickAdd={() => setIsAddMode(true)}
                titleButton="Add Environment"
                className="me-2"
              />
              <Archived
                title="Archived Environments"
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
          listEnvironments={listEnvironments}
          isSuccess={isListEnvironmentsSuccess}
          isLoading={isListEnvironmentsLoading}
          totalPage={pagination?.totalPage}
          setEditedItemId={setEditedItemId}
          archiveMutation={archiveMutation}
        />
      </Card>
    </>
  );
};

export default EnvironmentPage;
