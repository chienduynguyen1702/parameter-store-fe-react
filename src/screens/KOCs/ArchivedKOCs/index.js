import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { ArchivedItem, Form, NoDataArchived } from '../../../components';

import { useArchivedKOCs } from '../../../hooks/Archived';

export default function ArchivedKOCs() {
  const {
    archivedKOCs,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchiveKOCMutation,
  } = useArchivedKOCs();

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
        placeholder="Search archived KOCs"
      />
      <div className="archiverScroll">
        {isLoading && <Skeleton height={60} count={6} className="mb-2" />}
        {isSuccess &&
          (archivedKOCs.length > 0 ? (
            archivedKOCs?.map((item) => (
              <ArchivedItem
                item={item}
                havingImage
                handleUnarchive={(id) => unarchiveKOCMutation.mutate(id)}
                isLoading={unarchiveKOCMutation.isLoading}
                unArchivePermission={['user-archivist-unarchive']}
              />
            ))
          ) : (
            <NoDataArchived />
          ))}
      </div>
    </>
  );
}
