import { useState } from 'react';

import cn from 'classnames';
import styles from './KOCsRanking.module.sass';

import Row from './Row';

import { useDashboardKOCs } from '../../../../hooks/Data';

export default function KOCsRanking() {
  const [viewAll, setViewAll] = useState(false);

  const { statisticsKOCs } = useDashboardKOCs();
  return (
    <div>
      <div
        className={cn(
          'mt-4',
          styles.table,
          styles.content,
          viewAll && styles.scrollable,
        )}
      >
        <div className="d-table w-100">
          <div className={cn('tableHead d-none d-sm-table-row', styles.thRow)}>
            <div className={cn('d-table-cell', styles.tableCell)}></div>
            <div className={cn('d-table-cell', styles.tableCell)}>KOC</div>
            <div className={cn('d-table-cell', styles.tableCell)}>Tier</div>
            <div className={cn('d-table-cell', styles.tableCell)}>Category</div>
            <div className={cn('d-table-cell', styles.tableCell)}>Platform</div>
            <div className={cn('d-table-cell', styles.tableCell)}>Content</div>
          </div>
          {statisticsKOCs?.rankingKOC
            ?.slice(0, viewAll ? undefined : 5) // Display only 4 items when viewAll is false
            .map((item, index) => (
              <Row key={index} index={index} item={item} />
            ))}
        </div>
      </div>
      {!viewAll && (
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
    </div>
  );
}
