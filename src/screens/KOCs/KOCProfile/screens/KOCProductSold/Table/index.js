import { useEffect } from 'react';
import useProductsSold from './useProductsSold';

import Row from './Row';
import {
  NoData,
  Pagination,
  SkeletonTable,
} from '../../../../../../components';

export default function Table({
  listProductSold,
  totalPage,
  isSuccess,
  isLoading,
  totalProductSold,
}) {
  return (
    <div className="tableOuter">
      <div className="d-table w-100">
        <div className="d-sm-table-row tableHead d-none">
          <div className="d-table-cell tableCell pb-4">Product</div>
          <div className="d-table-cell tableCell">TTS Live</div>
          <div className="d-table-cell tableCell">TTS Show</div>
          <div className="d-table-cell tableCell">TTS VDO</div>
          <div className="d-table-cell tableCell">Ecomobi</div>
        </div>
        {isLoading && (
          <SkeletonTable avatar colsDesktop={4} rowsMobile={4} limit={5} />
        )}
        {isSuccess &&
          listProductSold?.map((product) => (
            <Row key={product.id} item={product} />
          ))}
      </div>
      {isSuccess && listProductSold?.length === 0 && <NoData />}
      {totalProductSold > 0 && <Pagination pageCount={totalPage || 5} />}
    </div>
  );
}
