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
import ArchivedPampering from '../components/ArchivedPamperings';
import Calendar from './Calendar';
import Filters from './Filters';

import useQueryString from '../../../hooks/useQueryString';

export const ViewOptionContextCalendar = createContext();

export default function CalendarView() {
  const navigate = useNavigate();

  const { queryString, parseQueryString } = useQueryString();

  // Switch between add pampering, edit pampering and setting
  const addPamperingMatch = useMatch('/pamperings/calendar-view/add-pampering');

  const isAddMode = useMemo(
    () => addPamperingMatch !== null,
    [addPamperingMatch],
  );

  const editPamperingMatch = useMatch(
    '/pamperings/calendar-view/edit-pampering/:id',
  );

  const isEditMode = useMemo(
    () => editPamperingMatch !== null,
    [editPamperingMatch],
  );

  const settingMatch = useMatch('/pamperings/calendar-view/settings');

  const isSettingMode = useMemo(() => settingMatch !== null, [settingMatch]);

  // Close modal
  const handleCloseModal = () => {
    navigate({
      pathname: '/pamperings/calendar-view',
      search: `?${parseQueryString(queryString)}`,
    });
  };

  const contextValue = {
    // Your context data and functions go here
    // Example:
    onClose: handleCloseModal,
  };

  return (
    <ViewOptionContextCalendar.Provider value={contextValue}>
      <Decentralization
        permissions={['pampering-create', 'pampering-update']}
        exact
      >
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
      {/* Add pampering and setting */}
      <div
        className={cn(
          styles.btnGroup,
          'd-inline-flex justify-content-between px-1 px-sm-0',
        )}
      >
        {/* Add Pampering  */}
        <Decentralization permissions={['pampering-create']} exact>
          <button
            className={cn('button-small')}
            onClick={() =>
              navigate({
                pathname: '/pamperings/calendar-view/add-pampering',
                search: `?${parseQueryString(queryString)}`,
              })
            }
          >
            <AiOutlinePlus className={cn(styles.icon)} />
            Create
          </button>
        </Decentralization>
        {/* Setting  */}
        <Decentralization permissions={['setting-list']} exact>
          <button
            className={cn('button-small button-white-grey-border')}
            onClick={() =>
              navigate({
                pathname: '/pamperings/calendar-view/settings',
              })
            }
          >
            <AiOutlineSetting className={cn(styles.icon)} />
            Setting
          </button>
        </Decentralization>
      </div>
      {/* Switch between View all pamperings and view my pamperings */}
      <Card
        className={cn(styles.card)}
        title="View All"
        classTitle={cn('title-purple', styles.title)}
        classCardHead={cn(styles.head, { [styles.hidden]: false })}
        head={
          <>
            <div className={cn(styles.nav, 'align-items-end')}>
              {/* Filter  */}
              <div className="mx-2">
                <Filters title="Filter" />
              </div>
              {/* Archived  */}
              <Decentralization permissions={['user-archivist-list']}>
                <Archived
                  title={'Archived Pamperings'}
                  className={cn(styles.archived)}
                >
                  <ArchivedPampering />
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
