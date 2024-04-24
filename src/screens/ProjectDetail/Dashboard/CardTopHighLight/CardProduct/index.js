import { useNavigate } from 'react-router';

import cn from 'classnames';
import styles from './CardProduct.module.sass';

import ProductItem from './ProductItem';

import { NoData } from '../../../../../components';

export default function CardProduct({ data }) {
  const navigate = useNavigate();

  return (
    <>
      <div className={cn('mt-4 d-flex flex-column', styles.heightCard)}>
        <div className="d-flex justify-content-between pb-3 fs-7 colorN4">
          <p>Product</p>
          <p className="me-3">Sales</p>
        </div>
        {/* {data.length > 0 && (
          <div className="d-flex flex-column justify-content-between flex-fill ">
            <div style={{ height: '360px' }} className="pe-2 overflow-y-scroll">
              {data?.map((item, index) => {
                return <ProductItem key={index} item={item} />;
              })}
            </div>
            <p
              className="button-white-grey-border w-100"
              onClick={() => navigate('/products')}
            >
              View all
            </p>
          </div>
        )}
        {data.length === 0 && ( */}
        <div
          className="d-flex flex-column justify-content-center mb-3"
          style={{ height: '360px' }}
        >
          <NoData />
        </div>
        {/* )} */}
      </div>
    </>
  );
}
