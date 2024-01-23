import React from 'react';

import styles from './Row.module.sass';
import cn from 'classnames';

import { Link } from 'react-router-dom';
import { ImageCustom } from '../../../../../components';

const Row = ({ item }) => {
  return (
    <>
      <div className="tableRow w-100">
        <div className="d-table-cell pe-4 ps-3 roundedLeft">
          <ImageCustom className={styles.image} src={item?.image_url} />
          <Link
            className={cn(
              'text-dark textOverFlow d-inline-block',
              styles.title,
            )}
            to={`/products/product-detail/${item.id}}`}
          >
            {item.title}
          </Link>
        </div>
        <p className="d-table-cell pe-4">{item.amount}</p>
        <p className="d-table-cell pe-4">{item.sku_code}</p>
        <div className="d-table-cell pe-4">
          <p
            style={{
              backgroundColor: item?.category?.color,
              padding: '0 8px',
              borderRadius: '6px',
              color: 'white',
              fontWeight: 600,
              width: 'fit-content',
            }}
          >
            {item?.category?.name}
          </p>
        </div>
        <div className="d-table-cell pe-4">
          <p
            style={{
              backgroundColor: item?.type?.color,
              padding: '0 8px',
              borderRadius: '6px',
              color: 'white',
              fontWeight: 600,
              width: 'fit-content',
            }}
          >
            {item?.type?.name}
          </p>
        </div>
        <p className="d-table-cell pe-2 roundedRight">{item.price}</p>
      </div>
      <div
        className="d-sm-none pb-4 mt-3 borderBottom w-100 lh-lg"
        key={`row-mobile-${item.id}`}
      >
        <div className="d-flex w-100 mb-3">
          <div>
            <ImageCustom
              className={cn(styles.image, 'm-0 me-3')}
              src={item?.image_url}
            />
          </div>
          <div>
            <div className="d-flex">
              <Link
                className={cn(
                  'text-dark textOverFlow d-inline-block',
                  styles.titleMobie,
                )}
                to={`/products/product-detail/${item.id}}`}
              >
                {item.title}
              </Link>
            </div>
            <div>
              <p className="d-table-cell pe-4 color4">{item.sku_code}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between my-2">
            <div>Amount</div>
            <div>{item.amount}</div>
          </div>
          <div className="d-flex justify-content-between my-2">
            <div>Category</div>
            <div>
              <p
                style={{
                  backgroundColor: item?.category?.color,
                  padding: '0 8px',
                  borderRadius: '6px',
                  color: 'white',
                  fontWeight: 600,
                  width: 'fit-content',
                }}
              >
                {item?.category?.name}
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between my-2">
            <div>Type</div>
            <div>
              <p
                style={{
                  backgroundColor: item?.type?.color,
                  padding: '0 8px',
                  borderRadius: '6px',
                  color: 'white',
                  fontWeight: 600,
                  width: 'fit-content',
                }}
              >
                {item?.type?.name}
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between my-2">
            <div>Price</div>
            <div>
              <p className="d-table-cell roundedRight">{item.price}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Row;
