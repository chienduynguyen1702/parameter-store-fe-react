import React, { useEffect } from 'react';

import Row from './Row';
import SkeletonTable from '../../../components/SkeletonTable';

import { NoData, Pagination } from '../../../components';

import useListLiquidationItem from '../../../hooks/Data/useListLiquidationItem';

export default function Table({ setCount }) {
  const {
    listLiquidationsItems,
    isSuccess,
    isLoading,
    limit,
    totalLiquidationsItems,
    totalPage,
    archiveLiquidationItemMutation,
    duplicateLiquidationItemMutation,
    listCategory,
    listPIC,
    listStatus,
  } = useListLiquidationItem();

  useEffect(() => {
    if (isSuccess) {
      setCount(totalLiquidationsItems);
    }
  }, [isSuccess, totalLiquidationsItems, setCount]);

  return (
    <div className="tableOuter">
      <div className="tableContainer">
        <div className="tableHead">
          <div className="tableCell pb-3">Name</div>
          <div className="tableCell ">Description</div>
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
            colsDesktop={8}
            rowsMobile={5}
            threeDotsCols
            limit={limit}
          />
        )}
        {isSuccess &&
          listLiquidationsItems?.map((item) => (
            <Row
              key={item.id}
              item={item}
              listCategory={listCategory}
              listPIC={listPIC}
              listStatus={listStatus}
              archiveMutation={archiveLiquidationItemMutation}
              duplicateMutation={duplicateLiquidationItemMutation}
            />
          ))}
      </div>
      {isSuccess && listLiquidationsItems.length === 0 && <NoData />}
      {isSuccess && listLiquidationsItems.length !== 0 && (
        <Pagination pageCount={totalPage || 5} />
      )}
    </div>
  );
}
