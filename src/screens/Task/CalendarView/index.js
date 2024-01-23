import React, { useState, useMemo, createContext } from 'react';
import { useMatch, useNavigate, Outlet } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineSetting } from 'react-icons/ai';

import cn from 'classnames';
import styles from './CalendarView.module.sass';

import {
  Card,
  ModalWithoutPortal,
  Archived,
  Decentralization,
} from '../../../components';
import ArchivedTask from '../components/ArchivedTasks';
import Calendar from './Calendar';
import Filters from './Filters';

import useQueryString from '../../../hooks/useQueryString';

export const ViewOptionContextCalendar = createContext();

export default function CalendarView() {
  const navigate = useNavigate();

  const { queryString, parseQueryString } = useQueryString();

  // Switch between add task, edit task and setting
  const addTaskMatch = useMatch('/tasks/calendar-view/add-task');

  const isAddMode = useMemo(() => addTaskMatch !== null, [addTaskMatch]);

  const editTaskMatch = useMatch('/tasks/calendar-view/edit-task/:id');

  const isEditMode = useMemo(() => editTaskMatch !== null, [editTaskMatch]);

  const settingMatch = useMatch('/tasks/calendar-view/settings');

  const isSettingMode = useMemo(() => settingMatch !== null, [settingMatch]);

  // Close modal
  const handleCloseModal = () => {
    navigate({
      pathname: '/tasks/calendar-view',
      search: `?${parseQueryString(queryString)}`,
    });
  };

  // set View option to ViewOptionContextCalendar context
  const [viewOption, setViewOption] = useState('View all tasks');

  return (
    <ViewOptionContextCalendar.Provider value={viewOption}>
      <Decentralization permissions={['user-create', 'user-update']} exact>
        <ModalWithoutPortal
          outerClassName={cn(
            styles.outer,
            isSettingMode && styles.outerSetting,
          )}
          visible={isAddMode || isEditMode || isSettingMode}
          onClose={handleCloseModal}
        >
          <Outlet
            context={{
              onClose: handleCloseModal,
            }}
          />
        </ModalWithoutPortal>
      </Decentralization>
      {/* Add task and setting */}
      <div
        className={cn(
          styles.btnGroup,
          'd-inline-flex justify-content-between px-1 px-sm-0',
        )}
      >
        {/* Add Task  */}
        <Decentralization permissions={['user-create']} exact>
          <button
            className={cn('button-small')}
            onClick={() =>
              navigate({
                pathname: '/tasks/calendar-view/add-task',
                search: `?${parseQueryString(queryString)}`,
              })
            }
          >
            <AiOutlinePlus className={cn(styles.icon)} />
            Add Task
          </button>
        </Decentralization>
        {/* Setting  */}
        <Decentralization permissions={['setting-list']} exact>
          <button
            className={cn('button-small button-white-grey-border')}
            onClick={() =>
              navigate({
                pathname: '/tasks/calendar-view/settings',
              })
            }
          >
            <AiOutlineSetting className={cn(styles.icon)} />
            Setting
          </button>
        </Decentralization>
      </div>
      {/* Switch between View all tasks and view my tasks */}
      <Card
        className={cn(styles.card)}
        title="View All"
        classTitle={cn('title-purple', styles.title)}
        classCardHead={cn(styles.head, { [styles.hidden]: false })}
        head={
          <>
            <div className={cn(styles.nav, 'align-items-end')}>
              <div className={styles.nav}>
                {/* View all tasks */}
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
                {/* View my tasks */}
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
              {/* Filter  */}
              <div className="mx-2">
                <Filters title="Filter" />
              </div>
              {/* Archived  */}
              <Decentralization permissions={['user-archivist-list']}>
                <Archived
                  title={'Archived Tasks'}
                  className={cn(styles.archived)}
                >
                  <ArchivedTask />
                </Archived>
              </Decentralization>
            </div>
          </>
        }
      ></Card>
      {/* Calendar */}
      <div className={cn(styles.calendar)}>
        <Calendar />
      </div>
    </ViewOptionContextCalendar.Provider>
  );
}
