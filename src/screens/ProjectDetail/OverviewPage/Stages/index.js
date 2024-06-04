import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import { toast } from 'react-toastify';

import { ButtonAdd, Card, Archived, Modal } from '../../../../components';

import Table from './components/Table/Table';
import AddStageForm from './components/AddStageForm';
import EditStageForm from './components/EditStageForm';

import { useListStagesArchived, useListStages } from '../../../../hooks/data';
import {
  archiveStage,
  getArchivedStages,
  unarchiveStage,
} from '../../../../services/api';

const Stages = () => {
  const { id } = useParams();
  const [isAddMode, setIsAddMode] = useState(false);
  const [editedItemId, setEditedItemId] = useState(undefined);
  const {
    listStages,
    pagination,
    isLoading: isListStagesLoading,
    isSuccess: isListStagesSuccess,
  } = useListStages(id);
  const {
    archivedList,
    isSuccess: isListArchivedSuccess,
    isLoading,
    search,
    handleSearch,
    archiveMutation,
    unarchiveMutation,
  } = useListStagesArchived({
    archivedStage: {
      listArchivedAPI: getArchivedStages,
      archiveAPI: archiveStage,
      unarchiveAPI: unarchiveStage,
      keyArchivistList: 'stage-archivist-list',
      keyList: 'stages',
      title: 'Stage',
      project_id: id,
    },
  });

  const { me } = useContext(AuthContext);
  const handleAddStageClick = () => {
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
        {isAddMode && (
          <AddStageForm project_id={id} onClose={() => setIsAddMode(false)} />
        )}
        {typeof editedItemId !== 'undefined' && (
          <EditStageForm
            project_id={id}
            editedItemId={editedItemId}
            onClose={() => setEditedItemId(undefined)}
          />
        )}
      </Modal>

      <Card
        title={`${isListStagesSuccess ? pagination?.total : '0'} Stages`}
        classTitle="title-yellow"
        head={
          <>
            {/* <FormSearch placeholder="Search by name" /> */}
            <div className="d-flex">
              <ButtonAdd
                handleClickAdd={handleAddStageClick}
                titleButton="Add Stage"
                className="me-2"
              />
              <Archived
                title="Archived Stages"
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
          listStages={listStages}
          isSuccess={isListStagesSuccess}
          isLoading={isListStagesLoading}
          totalPage={pagination?.totalPage}
          setEditedItemId={setEditedItemId}
          archiveMutation={archiveMutation}
        />
      </Card>
    </>
  );
};

export default Stages;
