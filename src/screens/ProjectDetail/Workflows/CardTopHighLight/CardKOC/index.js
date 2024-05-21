import cn from 'classnames';
import styles from './CardProduct.module.sass';

import UserItem from './UserItem';

import { NoData } from '../../../../../components';
import { Link } from 'react-router-dom';

export default function CardKOC({ data }) {
  return (
    <>
      <div className={cn('mt-4 d-flex flex-column', styles.heightCard)}>
        <div className="d-flex justify-content-between pb-3 fs-7 colorN4 borderBottom">
          <p>KOC</p>
          <p className="me-3">Views</p>
        </div>
        {data.length > 0 && (
          <div className="d-flex flex-column justify-content-between flex-fill">
            <div style={{ height: '360px' }} className="pe-2 overflow-y-scroll">
              {data?.map((item, index) => {
                return <UserItem item={item} key={index} />;
              })}
            </div>
            <Link
              to="/kocs"
              target="_blank"
              className="button-white-grey-border w-100"
            >
              View all
            </Link>
          </div>
        )}
        {data.length === 0 && (
          <div
            className="d-flex flex-column justify-content-center mb-3"
            style={{ height: '360px' }}
          >
            <NoData />
          </div>
        )}
      </div>
    </>
  );
}
