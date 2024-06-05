import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  ButtonAdd,
  ButtonDownload,
  Card,
  FormSearch,
  Archived,
  Modal,
  ConfirmReturnContentAndDownload,
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
  downloadAgentScript,
} from '../../../services/api';
import { saveAs } from 'file-saver';

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
      (Array.isArray(me.isAdminOfProjects) &&
        me.isAdminOfProjects.includes(Number(id)))
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

  const handleDownload = async () => {
    try {
      const response = await downloadAgentScript();
      const blob = new Blob([response.data], { type: 'text/plain' });
      saveAs(blob, 'get-parameters.sh');
      toast.success('Agent script downloaded successfully.');
    } catch (error) {
      console.error(error.response.data.error);
      toast.error(
        `Failed to download agent script: ${error.response.data.error}`,
      );
    }
  };
  const roleRequired = 'Admin';
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
          <ConfirmReturnContentAndDownload
            title="Agent created successfully!"
            message={`Please copy the token below and keep it safe. You won't be able to see it again.`}
            submessages={[
              'Usage: export $PARAMETER_STORE_TOKEN=your_agent_token_above && . ./get-parameters.sh -o output.file',
              "If you haven't had agent script yet, download now.",
            ]}
            content={`${returnToken}`}
            contentBtnSubmit="Done"
            onClose={() => setShowConfirmation(false)}
            handleSubmit={handleConfirmClose}
            handleDownload={handleDownload}
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
              <ButtonDownload
                handleClick={handleDownload}
                titleButton="Download Agent Script"
                className="button-white-grey-border ms-auto me-2"
              />
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
          roleRequired={roleRequired}
        />
      </Card>
    </>
  );
};

export default AgentPage;
