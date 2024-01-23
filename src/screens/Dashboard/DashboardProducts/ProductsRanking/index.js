import { useState } from 'react';

import cn from 'classnames';
import styles from './ProductsRanking.module.sass';

import Row from './Row';
import { useDashboardProducts } from '../../../../hooks/Data';

import { NoData } from '../../../../components';

export default function ProductsRanking() {
  const [viewAll, setViewAll] = useState(false);

  const { statisticsProducts } = useDashboardProducts();
  return (
    <div>
      <div
        className={cn(
          'mt-4',
          styles.table,
          statisticsProducts?.rankingProduct?.length === 0
            ? styles.noContent
            : styles.content,
          viewAll && styles.scrollable,
        )}
      >
        <div className="d-table w-100">
          <div
            className={cn('tableHead d-sm-table-row fs-7 d-none', styles.thRow)}
          >
            <div className={cn('d-table-cell', styles.tableCell)}></div>
            <div className={cn('d-table-cell', styles.tableCell)}>Product</div>
            <div className={cn('d-table-cell', styles.tableCell)}>Category</div>
            <div className={cn('d-table-cell', styles.tableCell)}>Type</div>
            <div className={cn('d-table-cell', styles.tableCell)}>Platform</div>
            <div className={cn('d-table-cell', styles.tableCell)}>
              Full Price
            </div>
            <div className={cn('d-table-cell', styles.tableCell)}>Revenue</div>
          </div>
          {statisticsProducts?.rankingProduct
            ?.slice(0, viewAll ? undefined : 5)
            ?.map((item, index) => {
              return <Row key={index} index={index} item={item} />;
            })}
        </div>
      </div>
      {!viewAll && statisticsProducts?.rankingProduct?.length > 5 && (
        <div
          className={cn(
            'border-light-gray w-100 py-2 mt-2 mt-md-0 text-center fw-bold cursor-pointer',
            styles.btnViewAll,
          )}
          onClick={() => setViewAll(true)}
        >
          View all
        </div>
      )}
      {statisticsProducts?.rankingProduct?.length === 0 && (
        <div className={cn('w-100 py-5 text-center fw-bold')}>
          <NoData />
        </div>
      )}
    </div>
  );
}
