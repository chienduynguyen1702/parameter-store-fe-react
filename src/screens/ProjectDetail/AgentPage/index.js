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
import AddAgentForm from './components/AddAgentForm';
import EditAgentForm from './components/EditAgentForm';

import { useListAgentsArchived, useListAgents, useProjectOverviewAndUserList } from '../../../hooks/data';
import {
  archiveAgent,
  getArchivedAgents,
  unarchiveAgent,
} from '../../../services/api';

const AgentPage = () => {
  const { id } = useParams();
  const [isAddMode, setIsAddMode] = useState(false);
  const [editedItemId, setEditedItemId] = useState(undefined);
  const {
    stages,
    environments,
  } = useProjectOverviewAndUserList(id);
  const {
    listAgents,
    pagination,
    isLoading: isListAgentsLoading,
    isSuccess: isListAgentsSuccess,
    addAgentMutation,
    editAgentMutation,
  } = useListAgents(id);
  const {
    archivedList,
    isSuccess: isListArchivedSuccess,
    isLoading,
    search,
    handleSearch,
    archiveMutation,
    unarchiveMutation,
  } = useListAgentsArchived({
    archivedAgent: {
      listArchivedAPI: getArchivedAgents,
      archiveAPI: archiveAgent,
      unarchiveAPI: unarchiveAgent,
      keyArchivistList: 'agent-archivist-list',
      keyList: 'agents',
      title: 'Agent',
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
          <AddAgentForm 
            project_id={id}
            onClose={() => setIsAddMode(false)} 
            stages={stages}
            environments={environments}
          />}
        {typeof editedItemId !== 'undefined' && (
          <EditAgentForm
            project_id={id}
            editedItemId={editedItemId}
            onClose={() => setEditedItemId(undefined)}
            stages={stages}
            environments={environments}
          />
        )}
      </Modal>

      <Card
        title={`${isListAgentsSuccess ? pagination?.total : '0'} Agents`}
        classTitle="title-purple"
        head={
          <>
            <FormSearch placeholder="Search by name" />
            <div className="d-flex">
              <ButtonAdd
                handleClickAdd={() => setIsAddMode(true)}
                titleButton="Add Agent"
                className="me-2"
              />
              <Archived
                title="Archived Agents"
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
          listAgents={listAgents}
          isSuccess={isListAgentsSuccess}
          isLoading={isListAgentsLoading}
          totalPage={pagination?.totalPage}
          setEditedItemId={setEditedItemId}
          archiveMutation={archiveMutation}
        />
      </Card>
    </>
  );
};

export default AgentPage;
