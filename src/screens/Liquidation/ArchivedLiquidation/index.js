import React, { useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';

import { ArchivedItem, NoDataArchived, Form } from '../../../components';

import useArchivedLiquidations from '../../../hooks/Archived/useArchivedLiquidations';

export default function ArchivedLiquidation() {
  const {
    archivedLiquidations,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchiveLiquidationsMutation,
  } = useArchivedLiquidations();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <Form
        value={search}
        setValue={handleSearch}
        onSubmit={handleSubmit}
        className="archiverSearch"
        placeholder="Search archived liquidation"
      />
      <div className="archiverScroll">
        {isLoading && <Skeleton height={60} count={6} className="mb-2" />}
        {isSuccess &&
          (archivedLiquidations?.length > 0 ? (
            archivedLiquidations?.map((item, index) => (
              <ArchivedItem
                key={index}
                item={item}
                className="ps-4"
                handleUnarchive={() =>
                  unarchiveLiquidationsMutation.mutate(item.id)
                }
                isLoading={unarchiveLiquidationsMutation.isLoading}
                unArchivePermission={['liquidation-archivist-unarchive']}
              />
            ))
          ) : (
            <NoDataArchived />
          ))}
      </div>
    </>
  );
}
