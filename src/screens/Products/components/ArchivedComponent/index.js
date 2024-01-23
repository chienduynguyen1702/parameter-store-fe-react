import React from 'react';

import { ArchivedItem, Form, NoData } from '../../../../components';

import useArchivedProducts from './useArchivedProducts';
import Skeleton from 'react-loading-skeleton';

export default function ArchivedComponent() {
  const {
    archivedProducts,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchiveProductMutation,
  } = useArchivedProducts();

  const handleUnarchiveProduct = (id) => {
    unarchiveProductMutation.mutate(id);
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
        placeholder="Search archived Products"
      />
      <div className="archiverScroll">
        {isLoading && <Skeleton height={60} count={6} className="mb-2" />}
        {isSuccess &&
          (archivedProducts?.length > 0 ? (
            archivedProducts?.map((item) => (
              <ArchivedItem
                item={item}
                havingImage
                handleUnarchive={handleUnarchiveProduct}
                isLoading={handleUnarchiveProduct.isLoading}
                unArchivePermission={['product-archivist-unarchive']}
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
