import { handleLongNumber } from '../../../../../utils/helpers';
import styles from './CardProduct.module.sass';

import cn from 'classnames';

import { NoData } from '../../../../../components';

export default function CardHashtag({ data }) {
  return (
    <>
      <div className={cn('mt-4 d-flex flex-column', styles.heightCard)}>
        <div className="d-flex justify-content-between pb-3 fs-7 colorN4">
          <p>Hashtag</p>
          <p className="me-3">Views</p>
        </div>
        <div className="pe-2 overflow-y-scroll">
          {data.length > 0 &&
            data?.map((item, index) => {
              return (
                <div
                  className="d-flex flex-grow-1 justify-content-between align-items-center py-2"
                  key={index}
                >
                  <p className={styles.description}>{item.name}</p>
                  <p>{handleLongNumber(item.total_view_count)}</p>
                </div>
              );
            })}
          {data.length === 0 && <NoData />}
        </div>
      </div>
    </>
  );
}
