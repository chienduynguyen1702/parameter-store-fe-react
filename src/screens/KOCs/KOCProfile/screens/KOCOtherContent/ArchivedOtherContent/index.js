import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { ArchivedItem, Form, NoData } from '../../../../../../components';

import useArchivedOtherContents from './useArchivedOtherContents';

export default function ArchivedOtherContent({ id }) {
  const {
    archivedOtherContent,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchiveOtherContentMutation,
  } = useArchivedOtherContents(id);

  const handleUnarchiveOtherContent = (id) => {
    unarchiveOtherContentMutation.mutate(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Form
        value={search}
        setValue={handleSearch}
        onSubmit={handleSubmit}
        className="mb-3 w-100 archiverSearch"
        placeholder="Search archived OtherContents"
      />
      <div className="archiverScroll">
        {isLoading && <Skeleton height={60} count={6} className="mb-2" />}

        {isSuccess &&
          (archivedOtherContent.length > 0 ? (
            archivedOtherContent?.map((item) => (
              <ArchivedItem
                item={item}
                havingImage
                handleUnarchive={handleUnarchiveOtherContent}
                isLoading={unarchiveOtherContentMutation.isLoading}
                unArchivePermission={['user-archivist-unarchive']}
              />
            ))
          ) : (
            <p className="d-flex justify-content-center mt-2 fs-6 color4">
              <NoData />
            </p>
          ))}
      </div>
    </>
  );
}
