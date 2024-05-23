import { handleLongNumber } from '../../../../../../utils/helpers';

import cn from 'classnames';
import styles from './UserItem.module.sass';
import { Link } from 'react-router-dom';

export default function UserItem({ item }) {
  return (
    <div className="d-flex justify-content-between align-items-center my-4 me-1">
      <div className="d-flex justify-content-center align-items-center">
        <Link
          to={`/koc-profile/${item?.id}/tiktok`}
          target="_blank"
          className={cn(styles.img, styles.link)}
        >
          <img
            className="w-100 h-100 summaryCardBox"
            src={item.avatar_url}
            alt="img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-avatar.jpg';
            }}
          ></img>
        </Link>
        <Link
          className={cn(styles.description, styles.link, 'ms-3')}
          to={`/koc-profile/${item?.id}/tiktok`}
          target="_blank"
        >
          {item.username}
        </Link>
      </div>
      <div className={cn(styles.amount, 'd-flex flex-column align-items-end')}>
        <div>{handleLongNumber(item.delta)}</div>
        {item?.settings[0] && (
          <div
            className={styles.tierCard}
            style={{
              backgroundColor: item?.settings[0]?.color || '#666',
            }}
          >
            {item?.settings[0]?.name}
          </div>
        )}
      </div>
    </div>
  );
}
