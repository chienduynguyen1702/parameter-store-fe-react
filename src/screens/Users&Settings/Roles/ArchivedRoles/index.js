import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { ArchivedItem, Form, NoDataArchived } from '../../../../components';

import useArchivedRoles from '../../../../hooks/Archived/useArchivedRoles';

function ArchivedRoles() {
  const {
    archivedRoles,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchiveRoleMutation,
  } = useArchivedRoles();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Form
        value={search}
        setValue={handleSearch}
        onSubmit={handleSubmit}
        className="archiverSearch"
        placeholder="Search archived roles"
      />
      <div className="archiverScroll">
        {isLoading && <Skeleton height={60} count={6} className="mb-2" />}
        {isSuccess &&
          (archivedRoles?.length > 0 ? (
            archivedRoles?.map((item) => (
              <ArchivedItem
                key={item.id}
                item={item}
                handleUnarchive={() => unarchiveRoleMutation.mutate(item.id)}
                isLoading={unarchiveRoleMutation.isLoading}
                unArchivePermission={['role-archivist-unarchive']}
              />
            ))
          ) : (
            <NoDataArchived />
          ))}
      </div>
    </>
  );
}

export default ArchivedRoles;
