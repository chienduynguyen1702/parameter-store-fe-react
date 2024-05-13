import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useQueryString from '../../../hooks/useQueryString';

import {
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
  const [editedItemId, setEditedItemId] = useState(undefined);
  const [isUpdating, setIsUpdating] = useState(false);
  const { queryString, setQueryString } = useQueryString();
  const {
    listParameters,
    isLoading: isListParametersLoading,
    isSuccess: isListUsersSuccess,
    pagination,
    // stages,
    // environments,
    versions,
  } = useListParameters(id);
  // console.log('pagination', pagination);
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

  const handleClickApply = () => {
    if (overview.auto_update === true) {
      toast.warning(
        'This project is in auto update mode. No need to apply parameters.',
      );
    } else {
      setIsUpdating(true);
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
        visible={isUpdating}
        onClose={() => {
          setIsUpdating(false);
        }}
      >
        {/* if overview.auto_update == false then render <ApplyParamForm/>
            else render toast warning message "This project auto update mode is not set."
          */}

        <ApplyParamForm
          project_id={id}
          onClose={() => setIsUpdating(false)}
          versions={versions}
          listParameters={listParameters}
        />
      </Modal>

      <div className={styles.filter}>
        <ButtonApply
          handleClickApply={handleClickApply}
          titleButton="Apply Parameters"
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
                />
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
          isArchivedSuccess={isArchivedSuccess}
        />
      </Card>
    </>
  );
};

export default ParametersPage;
