import React, { useState } from 'react';

import { ButtonAdd, Card, FormSearch, Archived, Modal } from '../../components';

import Table from './components/Table/Table';
import AddProjectForm from './components/AddProjectForm';
import EditProjectForm from './components/EditProjectForm';

import { useListProjects, useListArchived } from '../../hooks/data';
import {
  archiveProject,
  getArchivedProjects,
  unarchiveProject,
} from '../../services/api';

const ProjectsPage = () => {
  const [isAddMode, setIsAddMode] = useState(false);
  const [editedItemId, setEditedItemId] = useState(undefined);

  const {
    listProjects,
    isLoading: isListProjectsLoading,
    isSuccess: isListUsersSuccess,
    pagination,
  } = useListProjects();
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
      // listArchivedAPI: getArchivedProjects,
      // archiveAPI: archiveProject,
      // unarchiveAPI: unarchiveProject,
      keyArchivistList: 'project-archivist-list',
      keyList: 'projects',
      title: 'Project',
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
        {isAddMode && <AddProjectForm onClose={() => setIsAddMode(false)} />}
        {typeof editedItemId !== 'undefined' && (
          <EditProjectForm
            id={editedItemId}
            onClose={() => setEditedItemId(undefined)}
          />
        )}
      </Modal>

      <Card
        title={`${isListUsersSuccess ? pagination?.total : '-'} Projects`}
        classTitle="title-purple"
        head={
          <>
            <FormSearch placeholder="Search by name" />
            <div className="d-flex">
              <ButtonAdd
                handleClickAdd={() => setIsAddMode(true)}
                titleButton="Add Project"
                className="me-2"
              />
              <Archived
                title="Archived projects"
                name="projects"
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
          listProjects={listProjects}
          isSuccess={isListUsersSuccess}
          isLoading={isListProjectsLoading}
          totalPage={pagination?.totalPage}
          setEditedItemId={setEditedItemId}
          archiveMutation={archiveMutation}
        />
      </Card>
    </>
  );
};

export default ProjectsPage;
