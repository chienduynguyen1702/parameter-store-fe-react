import React, { useState, useMemo, createContext, useCallback } from 'react';
import { useMatch, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineSetting } from 'react-icons/ai';
import { useMutation } from '@tanstack/react-query';

import cn from 'classnames';
import styles from './TableView.module.sass';

import {
  ButtonExport,
  Card,
  FormSearch,
  ModalWithoutPortal,
} from '../../../components';
import Archived from '../../../components/Archived';
import Decentralization from '../../../components/Decentralization';
import ArchivedTasks from '../components/ArchivedTasks';

import Table from './Table';
import Filters from './Table/Filters';

import useQueryString from '../../../hooks/useQueryString';
import { exportTasks } from '../../../services/api';
import { exportExcel } from '../../../utils/helpers';
import { BiImport } from 'react-icons/bi';

export const ViewOptionContext = createContext();

export default function TableView() {
  const navigate = useNavigate();

  // Query string
  const { queryString, parseQueryString } = useQueryString();

  // Switch between Add task, Edit task, Setting and Select evidence mode
  const addTaskMatch = useMatch('/tasks/table-view/add-task');

  const isAddMode = useMemo(() => addTaskMatch !== null, [addTaskMatch]);

  const editTaskMatch = useMatch('/tasks/table-view/edit-task/:id');

  const isEditMode = useMemo(() => editTaskMatch !== null, [editTaskMatch]);

  const viewTaskMatch = useMatch('/tasks/table-view/view-task/:id');

  const isViewMode = useMemo(() => viewTaskMatch !== null, [viewTaskMatch]);

  const settingMatch = useMatch('/tasks/table-view/settings');

  const isSettingMode = useMemo(() => settingMatch !== null, [settingMatch]);

  const evidenceMatch = useMatch('/tasks/table-view/select-evidence/:id');

  const isEvidenceMode = useMemo(() => evidenceMatch !== null, [evidenceMatch]);

  // Close modal
  const handleCloseModal = () => {
    navigate({
      pathname: '/tasks/table-view',
      search: `?${parseQueryString(queryString)}`,
    });
  };

  const exportMutation = useMutation((query) => exportTasks(query));

  const location = useLocation();
  const query = location.search;

  const handleClickExport = useCallback(() => {
    exportMutation.mutate(query, {
      onSuccess: (data) => {
        exportExcel(data.data.data, 'Tasks');
      },
    });
  }, [exportMutation, query]);

  const [countTask, setCountTask] = useState(0);

  // set View option
  const [viewOption, setViewOption] = useState('View all tasks');

  return (
    <ViewOptionContext.Provider value={viewOption}>
      {/* Modal  */}
      <Decentralization permissions={['user-create', 'user-update']} exact>
        <ModalWithoutPortal
          outerClassName={cn(
            styles.outer,
            isSettingMode && styles.outerSetting,
          )}
          visible={
            isAddMode ||
            isEditMode ||
            isViewMode ||
            isSettingMode ||
            isEvidenceMode
          }
          onClose={() => {
            handleCloseModal();
          }}
        >
          <Outlet
            context={{
              onClose: () => {
                handleCloseModal();
              },
            }}
          />
        </ModalWithoutPortal>
      </Decentralization>

      <div className="mb-4 d-inline-flex justify-content-between">
        {/* Add button  */}
        <Decentralization permissions={['user-create']} exact>
          <button
            className="button-small"
            onClick={() =>
              navigate({
                pathname: '/tasks/table-view/add-task',
                search: `?${parseQueryString(queryString)}`,
              })
            }
          >
            <AiOutlinePlus className="fs-5" />
            Add Task
          </button>
        </Decentralization>
        {/* Setting button  */}
        <Decentralization permissions={['setting-list']} exact>
          <button
            className="button-small button-white-grey-border ms-2"
            onClick={() =>
              navigate({
                pathname: '/tasks/table-view/settings',
                search: `?${parseQueryString(queryString)}`,
              })
            }
          >
            <AiOutlineSetting className="fs-5" />
            Setting
          </button>
        </Decentralization>
      </div>

      <Card
        title={`${countTask} Tasks`}
        classTitle="title-purple"
        classCardHead={'d-flex flex-wrap flex-row flex-lg-col gap-3'}
        head={
          <>
            {/* Search form  */}
            <FormSearch
              className="mt-3 mt-sm-0"
              placeholder="Search by title"
            />
            <div>
              <Decentralization permissions={['user']}>
                <button
                  className={cn(styles.link, {
                    [styles.active]: viewOption === 'View all tasks',
                  })}
                  onClick={() => setViewOption('View all tasks')}
                >
                  All
                </button>
              </Decentralization>
              <Decentralization permissions={['role']}>
                <button
                  className={cn(styles.link, {
                    [styles.active]: viewOption === 'View my tasks',
                  })}
                  onClick={() => setViewOption('View my tasks')}
                >
                  Me
                </button>
              </Decentralization>
            </div>
            {/* Filter task */}
            <div className="d-flex">
              <Filters className="me-2" title="Filter" />
              {/* Archive list modal button */}
              <Decentralization permissions={['user-archivist-list']}>
                <Archived title={'Archived Tasks'}>
                  <ArchivedTasks />
                </Archived>
              </Decentralization>
              {/* Export button  */}
              <Decentralization permissions={['user-export']}>
                <ButtonExport
                  isLoading={exportMutation.isLoading}
                  handleClickExport={handleClickExport}
                />
              </Decentralization>
            </div>
          </>
        }
      >
        <Decentralization permissions={['user-list']}>
          <Table setCountTask={setCountTask} />
        </Decentralization>
      </Card>
    </ViewOptionContext.Provider>
  );
}
