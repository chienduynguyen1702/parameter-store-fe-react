import React, { useContext, useState } from 'react';

import { ButtonAdd, Card, FormSearch, Archived, Modal } from '../../components';
import { toast } from 'react-toastify';

import Table from './components/Table/Table';
import AddProjectForm from './components/AddProjectForm';

import { AuthContext } from '../../context/AuthContext';

import { useListProjects, useListProjectsArchived } from '../../hooks/data';
import {
  archiveProject,
  getArchivedProjects,
  unarchiveProject,
} from '../../services/api';

const ProjectsPage = () => {
  const [isAddMode, setIsAddMode] = useState(false);
  // const [editedItemId, setEditedItemId] = useState(undefined);
  const { me } = useContext(AuthContext);

  const {
    listProjects,
    isLoading: isListProjectsLoading,
    isSuccess: isListUsersSuccess,
    pagination,
  } = useListProjects();
  // console.log('listProjects', listProjects);
  const {
    archivedList,
    isSuccess: isListArchivedSuccess,
    isLoading,
    search,
    handleSearch,
    archiveMutation,
    unarchiveMutation,
  } = useListProjectsArchived({
    archivedProjects: {
      listArchivedAPI: getArchivedProjects,
      archiveAPI: archiveProject,
      unarchiveAPI: unarchiveProject,
      keyArchivistList: 'project-archivist-list',
      keyList: 'projects',
      title: 'Project',
    },
  });
  const roleRequired = 'Organization Admin';
  const handleAddProjectClick = () => {
    if (me.isOrganizationAdmin) {
      setIsAddMode(true);
    } else {
      toast.error('You are not authorized to perform this action');
    }
  };
  return (
    <>
      <Modal
        outerClassName={'outerModal'}
        // visible={isAddMode}
        visible={isAddMode || typeof editedItemId !== 'undefined'}
        onClose={() => {
          setIsAddMode(false);
          // setEditedItemId(undefined);
        }}
      >
        {isAddMode && <AddProjectForm onClose={() => setIsAddMode(false)} />}
        {/* {typeof editedItemId !== 'undefined' && (
          <EditProjectForm
            id={editedItemId}
            onClose={() => setEditedItemId(undefined)}
          />
        )} */}
      </Modal>

      <Card
        // title={`${isListUsersSuccess ? pagination.total : "0"} Projects`}
        title={`Choose project to manage parameters`}
        classTitle="title-purple"
        head={
          <>
            <FormSearch placeholder="Search by name" />
            <div className="d-flex">
              <ButtonAdd
                handleClickAdd={handleAddProjectClick}
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
          // setEditedItemId={setEditedItemId}
          roleRequired={roleRequired}
          archiveMutation={archiveMutation}
        />
      </Card>
    </>
  );
};

export default ProjectsPage;
