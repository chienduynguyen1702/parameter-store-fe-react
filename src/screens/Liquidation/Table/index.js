import React, { useEffect } from 'react';

import Row from './Row';
import SkeletonTable from '../../../components/SkeletonTable';

import { NoData, Pagination } from '../../../components';

import useListLiquidation from '../../../hooks/Data/useListLiquidation';

export default function Table({ setTotal, viewOption }) {
  const {
    listLiquidation,
    isSuccess,
    isLoading,
    isError,
    limit,
    totalLiquidation,
    totalPage,
    archiveLiquidationMutation,
    duplicateLiquidationMutation,
    listCategory,
    listPIC,
    listStatus,
  } = useListLiquidation({ viewOption });

  useEffect(() => {
    if (isSuccess) {
      setTotal(totalLiquidation);
    }
  }, [isSuccess, totalLiquidation, setTotal]);
  return (
    <div className="tableOuter">
      <div className="tableContainer">
        <div className="tableHead d-sm-table-row d-none">
          <div className="tableCell pb-4">Name</div>
          <div className="tableCell">Category</div>
          <div className="tableCell">Total Cost</div>
          <div className="tableCell">P.I.C</div>
          <div className="tableCell">Receiver</div>
          <div className="tableCell">Status</div>
          <div className="tableCell">Last Updated</div>
          <div className="tableCell invisible">...</div>
        </div>
        {isLoading && (
          <SkeletonTable
            colsDesktop={7}
            threeDotsCols
            rowsMobile={6}
            limit={limit}
          />
        )}
        {isSuccess &&
          listLiquidation?.map((item) => (
            <Row
              key={item.id}
              item={item}
              listCategory={listCategory}
              listPIC={listPIC}
              listStatus={listStatus}
              archiveMutation={archiveLiquidationMutation}
              duplicateMutation={duplicateLiquidationMutation}
            />
          ))}
      </div>
      {isSuccess && listLiquidation?.length === 0 && <NoData />}
      {isError && <NoData />}
      {((isSuccess && listLiquidation.length !== 0) || isLoading) && (
        <Pagination pageCount={totalPage || 5} />
      )}
    </div>
  );
}
