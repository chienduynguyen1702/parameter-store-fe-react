import cn from 'classnames';
import styles from './Row.module.sass';

import { handleLongNumber } from '../../../../../utils/helpers';

export default function Row({ index, item }) {
  return (
    <>
      <div
        className={cn('tableRow d-none d-sm-table-row', styles['d-table-row'])}
      >
        <div className={cn('d-table-cell px-2', styles.rowTable)}>
          {index < 3 ? (
            <div className={styles.ranking}>#{index + 1}</div>
          ) : (
            <div></div>
          )}
        </div>
        <div className={cn('d-table-cell', styles.rowTable)}>
          <div className="d-flex">
            <div className="me-2 d-flex align-items-center">
              <img
                className={styles.ava}
                src={item.image_url}
                alt="img avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/content/not-found-image.jpg';
                }}
              />
            </div>
            <div>
              <div>{item.title}</div>
              <div className="fs-7 text-light-gray">{item.sku_code}</div>
            </div>
          </div>
        </div>
        {item?.settings?.map((setting) => {
          return (
            <div className={cn('d-table-cell', styles.rowTable)}>
              <div
                className={cn('text-white px-2 rounded', styles.setting)}
                style={{
                  backgroundColor: setting.color,
                }}
              >
                {setting.name}
              </div>
            </div>
          );
        })}
        <div className={cn('d-table-cell', styles.rowTable)}>
          <div
            className={cn('text-white px-2 rounded', styles.platform)}
            style={{
              backgroundColor:
                item?.shop === 'TikTokShop' ? '#111315' : '#FF6A55',
            }}
          >
            {item?.shop}
          </div>
        </div>
        <div className={cn('d-table-cell', styles.rowTable)}>
          <div className={styles.price}>
            {handleLongNumber(Number(item?.full_price))}
          </div>
        </div>
        <div className={cn('d-table-cell', styles.rowTable)}>
          <div className={styles.contentCount}>
            {handleLongNumber(Number(item.revenue))}
          </div>
        </div>
      </div>

      <div className="d-block d-sm-none pb-4 mt-3 borderBottomCard">
        <div className="d-flex align-items-center lh-lg">
          <div className="me-2 d-flex align-items-center">
            <img
              className="rounded-circle"
              width={52}
              height={79}
              src={item.image_url}
              alt="img avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/content/not-found-image.jpg';
              }}
            />
          </div>
          <div className={styles.titleName}>
            <div className={styles.titleCard}>{item.title}</div>
            <div className="fs-7 text-light-gray">{item.sku_code}</div>
          </div>
        </div>

        <div className="d-flex justify-content-between my-2">
          <div className="color4">Category</div>
          <div
            className={cn('text-white px-2 rounded', styles.setting)}
            style={{
              backgroundColor: item?.settings?.[0]?.color,
            }}
          >
            {item?.settings?.[0]?.name}
          </div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="color4">Type</div>
          <div
            className={cn('text-white px-2 rounded', styles.setting)}
            style={{
              backgroundColor: item?.settings?.[1]?.color,
            }}
          >
            {item?.settings?.[1]?.name}
          </div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="color4">Platform</div>
          <div
            className={cn('text-white px-2 rounded', styles.platform)}
            style={{
              backgroundColor:
                item?.shop === 'TikTokShop' ? '#111315' : '#FF6A55',
            }}
          >
            {item?.shop}
          </div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="color4">Full Price</div>
          <div className={styles.price}>
            {handleLongNumber(Number(item?.full_price))}
          </div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="color4">Receiver</div>
          <div className={styles.contentCount}>
            {handleLongNumber(Number(item.revenue))}
          </div>
        </div>
      </div>
    </>
  );
}
