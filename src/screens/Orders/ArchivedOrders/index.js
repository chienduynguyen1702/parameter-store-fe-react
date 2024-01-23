import React from 'react';
import Skeleton from 'react-loading-skeleton';

import useArchivedOrders from './useArchivedOrders';
import { ArchivedItem, Form, NoData } from '../../../components';

export default function ArchivedOrders() {
  const {
    archivedOrders,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchiveOrderMutation,
  } = useArchivedOrders();

  const handleUnarchiveOrder = (id) => {
    unarchiveOrderMutation.mutate(id);
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
        placeholder="Search archived orders"
      />
      <div className="archiverScroll">
        {isLoading && <Skeleton height={60} count={6} className="mb-2" />}
        {isSuccess &&
          (archivedOrders.length > 0 ? (
            archivedOrders.map((item) => (
              <ArchivedItem
                item={item}
                handleUnarchive={handleUnarchiveOrder}
                isLoading={unarchiveOrderMutation.isLoading}
                unArchivePermission={['user-archivist-unarchive']}
              />
            ))
          ) : (
            <p className="d-flex justify-content-center mt-2 fs-6 font14">
              <NoData />
            </p>
          ))}
      </div>
    </>
  );
}
