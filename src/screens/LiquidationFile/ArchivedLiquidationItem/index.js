import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { ArchivedItem, NoDataArchived, Form } from '../../../components';

import useArchivedLiquidationsItems from '../../../hooks/Archived/useArchivedLiquidationsItems';

export default function ArchivedLiquidationItem() {
  const {
    archivedLiquidationsItems,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchiveLiquidationsItemsMutation,
  } = useArchivedLiquidationsItems();

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
        placeholder="Search archived liquidation"
      />
      <div className="archiverScroll">
        {isLoading && <Skeleton height={60} count={6} className="mb-2" />}
        {isSuccess &&
          (archivedLiquidationsItems?.length > 0 ? (
            archivedLiquidationsItems?.map((item, index) => (
              <ArchivedItem
                key={index}
                havingImage={false}
                className="ps-4"
                item={item}
                handleUnarchive={(id) =>
                  unarchiveLiquidationsItemsMutation.mutate(id)
                }
                isLoading={unarchiveLiquidationsItemsMutation.isLoading}
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
