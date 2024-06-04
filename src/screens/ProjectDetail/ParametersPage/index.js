import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useQueryString from '../../../hooks/useQueryString';

import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

import {
  ButtonDuplicate,
  ButtonAdd,
  Card,
  FormSearch,
  Archived,
  Modal,
  FiltersCustom,
  ButtonApply,
} from '../../../components';

import Table from './components/Table/Table';
import AddParameterForm from './components/AddParameterForm';
import EditParameterForm from './components/EditParameterForm';
import FormFilter from './components/FormFilter';
import ApplyParamForm from './components/ApplyParamForm';
import ReleaseVersionForm from './components/ReleaseVersionForm';
import styles from './Parameter.module.sass';
import {
  useListParameters,
  useListParametersArchived,
  useProjectOverviewAndUserList,
} from '../../../hooks/data';
import {
  archiveParameter,
  getArchivedParameters,
  unarchiveParameter,
} from '../../../services/api';

const ParametersPage = () => {
  const { id } = useParams();
  const [isAddMode, setIsAddMode] = useState(false);
  const [isReleaseMode, setIsReleaseMode] = useState(false);
  const [editedItemId, setEditedItemId] = useState(undefined);
  const [isApplying, setIsApplying] = useState(false);
  const { queryString, setQueryString } = useQueryString();
  const {
    listParameters,
    isLoading: isListParametersLoading,
    isSuccess: isListUsersSuccess,
    pagination,
    // stages,
    // environments,
    versions,
    downloadParameters,
  } = useListParameters(id);
  // console.log('versions', versions);
  const { overview } = useProjectOverviewAndUserList(id);
  const { stages, environments } = useProjectOverviewAndUserList(id);
  const {
    archivedList,
    isSuccess: isListArchivedSuccess,
    isLoading,
    search,
    handleSearch,
    archiveMutation,
    isArchivedSuccess,
    unarchiveMutation,
  } = useListParametersArchived({
    archivedParameters: {
      listArchivedAPI: getArchivedParameters,
      archiveAPI: archiveParameter,
      unarchiveAPI: unarchiveParameter,
      keyArchivistList: 'parameter-archivist-list',
      keyList: 'parameters',
      title: 'Parameter',
      project_id: id,
    },
  });
  const sortedVersions = versions?.sort((a, b) => {
    // Compare version numbers as strings
    return compareVersionStrings(b.number, a.number); // Sort in descending order
  });

  function compareVersionStrings(a, b) {
    // Split version strings into arrays of individual version components
    const versionA = a.split('.').map(Number);
    const versionB = b.split('.').map(Number);

    // Compare each version component from left to right
    for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
      if (versionA[i] === undefined) return -1; // A has fewer components
      if (versionB[i] === undefined) return 1; // B has fewer components
      if (versionA[i] > versionB[i]) return 1; // A is greater
      if (versionA[i] < versionB[i]) return -1; // B is greater
    }

    return 0; // Versions are equal
  }
  const latestVersion = sortedVersions?.[0]?.number || '';
  const { me } = useContext(AuthContext);

  const handleClickApply = () => {
    if (
      me.isOrganizationAdmin ||
      (Array.isArray(me.isAdminOfProjects) &&
        me.isAdminOfProjects.includes(Number(id)))
    ) {
      if (overview.auto_update === true) {
        toast.warning(
          'This project is in auto update mode. No need to apply parameters.',
        );
      } else {
        setIsApplying(true);
      }
    } else {
      toast.error('You are not authorized to perform this action');
    }
  };

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

  const handleReleaseClick = () => {
    if (
      me.isOrganizationAdmin ||
      (Array.isArray(me.isAdminOfProjects) &&
        me.isAdminOfProjects.includes(Number(id)))
    ) {
      setIsReleaseMode(true);
    } else {
      toast.error('You are not authorized to perform this action');
    }
  };
  const roleRequired = 'Admin';
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
          <AddParameterForm
            project_id={id}
            onClose={() => setIsAddMode(false)}
            stages={stages}
            environments={environments}
          />
        )}
        {typeof editedItemId !== 'undefined' && (
          <EditParameterForm
            project_id={id}
            editedItemId={editedItemId}
            onClose={() => setEditedItemId(undefined)}
            stages={stages}
            environments={environments}
          />
        )}
      </Modal>
      <Modal
        outerClassName={'outerModal'}
        visible={isApplying}
        onClose={() => {
          setIsApplying(false);
        }}
      >
        {/* if overview.auto_update == false then render <ApplyParamForm/>
            else render toast warning message "This project auto update mode is not set."
          */}

        <ApplyParamForm
          project_id={id}
          onClose={() => setIsApplying(false)}
          versions={versions}
          listParameters={listParameters}
        />
      </Modal>

      <Modal
        outerClassName={'outerModal'}
        visible={isReleaseMode}
        onClose={() => {
          setIsReleaseMode(false);
        }}
      >
        <ReleaseVersionForm
          project_id={id}
          onClose={() => setIsReleaseMode(false)}
          versions={versions}
          listParameters={listParameters}
          currentVersion={latestVersion}
        />
      </Modal>

      <div className={styles.filter}>
        <ButtonApply
          handleClickApply={handleClickApply}
          titleButton="Deploy Parameters"
          className="me-2"
        />
      </div>
      <Card
        title={`${isListUsersSuccess ? pagination?.total : '0'} Parameters`}
        classTitle="title-purple"
        head={
          <>
            <FormSearch placeholder="Search by name" />
            <div className="d-flex">
              <FiltersCustom className="me-2">
                <FormFilter
                  stages={stages}
                  environments={environments}
                  versions={versions}
                  downloadParameters={downloadParameters}
                />
              </FiltersCustom>
              <ButtonDuplicate
                handleClick={handleReleaseClick}
                titleButton="Release Version"
                className="me-2"
              />
              <ButtonAdd
                handleClickAdd={handleAddClick}
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
          isArchivedSuccess={isArchivedSuccess}
          roleRequired={roleRequired}
        />
      </Card>
    </>
  );
};

export default ParametersPage;
