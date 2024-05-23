import { useNavigate } from 'react-router';

import cn from 'classnames';
import styles from './ProductItem.module.sass';

import { handleLongNumber } from '../../../../../../utils/helpers';

export default function ProductItem({ item }) {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-between align-items-center my-4 me-1">
      <div className="d-flex justify-content-center align-items-center">
        <div
          className={cn(styles.img, styles.link)}
          onClick={() => {
            navigate(`/product-detail/${item?.id}/overview`);
          }}
        >
          <img
            className="w-100 h-100"
            src={item.image_url}
            alt="img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/content/not-found-image.jpg';
            }}
          />
        </div>
        <div className={styles.rightCol}>
          <div
            className={cn(styles.description, styles.link, 'ms-3')}
            onClick={() => {
              navigate(`/product-detail/${item?.sku_code}/overview`);
            }}
          >
            {item.title}
          </div>
          <div
            className={cn('fs-7 text-light-gray ms-3', styles.link)}
            onClick={() => {
              navigate(`/products?search=${item?.sku_code}`);
            }}
          >
            {item.sku_code}
          </div>
        </div>
      </div>
      <div className={styles.amount}>{handleLongNumber(item.sold, 0)}</div>
    </div>
  );
}
