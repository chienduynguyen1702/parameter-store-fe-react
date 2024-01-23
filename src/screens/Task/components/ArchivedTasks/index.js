import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { ArchivedItem, Form } from '../../../../components';

import useArchivedTasks from './useArchivedTasks';

export default function ArchivedTasks() {
  // ArchivedTasks Query
  const {
    archivedTasks,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchiveTaskMutation,
  } = useArchivedTasks();

  const handleUnarchiveTask = (id) => {
    unarchiveTaskMutation.mutate(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {/* Search Archived Tasks */}
      <Form
        value={search}
        setValue={handleSearch}
        onSubmit={handleSubmit}
        className="mb-3 w-100 archiverSearch"
        placeholder="Search archived tasks"
      />
      {/* Archived Tasks */}
      <div className="archiverScroll">
        {isLoading && <Skeleton height={60} count={6} className="mb-2" />}
        {isSuccess &&
          archivedTasks.map((item) => (
            <ArchivedItem
              item={item}
              havingImage
              handleUnarchive={handleUnarchiveTask}
              isLoading={unarchiveTaskMutation.isLoading}
              unArchivePermission={['user-archivist-unarchive']}
            />
          ))}
      </div>
    </>
  );
}
