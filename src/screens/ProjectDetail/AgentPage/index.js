import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  ButtonAdd,
  Card,
  FormSearch,
  Archived,
  Modal,
  ConfirmReturnContent,
} from '../../../components';

import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

import Table from './components/Table/Table';
import AddAgentForm from './components/AddAgentForm';
import EditAgentForm from './components/EditAgentForm';

import {
  useListAgentsArchived,
  useListAgents,
  useProjectOverviewAndUserList,
} from '../../../hooks/data';
import {
  archiveAgent,
  getArchivedAgents,
  unarchiveAgent,
} from '../../../services/api';

const AgentPage = () => {
  const { id } = useParams();
  const [isAddMode, setIsAddMode] = useState(false);
  const [editedItemId, setEditedItemId] = useState(undefined);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [returnToken, setReturnToken] = useState(''); // Return token for confirmation popup

  const { stages, environments, listWorkflows } =
    useProjectOverviewAndUserList(id);
  const {
    listAgents,
    pagination,
    isLoading: isListAgentsLoading,
    isSuccess: isListAgentsSuccess,
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

  const { me } = useContext(AuthContext);
  const handleAddClick = () => {
    if (
      me.isOrganizationAdmin ||
      (Array.isArray(me.isAdminOfProjects) && me.isAdminOfProjects.includes(id))
    ) {
      setIsAddMode(true);
    } else {
      toast.error('You are not authorized to perform this action');
    }
  };
  const handleCloseAddForm = () => {
    setIsAddMode(false);
    setEditedItemId(undefined);
  };

  const handleConfirmClose = () => {
    setShowConfirmation(false);
    handleCloseAddForm(); // Close the AddForm when confirmed
  };

  return (
    <>
      <Modal
        outerClassName={'outerModal'}
        visible={
          isAddMode || typeof editedItemId !== 'undefined' || showConfirmation
        }
        onClose={handleCloseAddForm}
      >
        {isAddMode && (
          <AddAgentForm
            project_id={id}
            onClose={() => setIsAddMode(false)}
            stages={stages}
            environments={environments}
            setShowConfirmation={setShowConfirmation}
            setReturnToken={setReturnToken}
            workflows={listWorkflows}
          />
        )}
        {typeof editedItemId !== 'undefined' && (
          <EditAgentForm
            project_id={id}
            editedItemId={editedItemId}
            onClose={() => setEditedItemId(undefined)}
            stages={stages}
            environments={environments}
            workflows={listWorkflows}
          />
        )}
        {showConfirmation && ( // Render confirmation popup here
          <ConfirmReturnContent
            title="Agent created successfully!"
            message={`Please copy the token below and keep it safe. You won't be able to see it again.`}
            content={`${returnToken}`}
            contentBtnSubmit="Done"
            onClose={() => setShowConfirmation(false)}
            handleSubmit={handleConfirmClose}
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
                handleClickAdd={handleAddClick}
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
