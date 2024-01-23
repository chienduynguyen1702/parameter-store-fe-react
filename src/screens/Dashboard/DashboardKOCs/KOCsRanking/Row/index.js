import { useNavigate } from 'react-router';
import { scrollToTop } from '../../../../../utils/helpers';

import cn from 'classnames';
import styles from './Row.module.sass';

export default function Row({ item, index }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={cn(
          'tableRow d-none d-sm-table-row w-100',
          styles['d-table-row'],
        )}
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
                className={cn(styles.ava, styles.link)}
                src={item?.avatarUrl}
                alt="img avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-avatar.jpg';
                }}
                onClick={() => {
                  scrollToTop();
                  navigate(`/koc-profile/${item?.id}/tiktok`);
                }}
              ></img>
            </div>
            <div>
              <div
                className={styles.link}
                onClick={() => {
                  scrollToTop();
                  navigate(
                    `/koc-profile/${item?.id}/${item?.platforms[0]?.name}`,
                  );
                }}
              >
                {item?.username}
              </div>
              <div className="fs-7 text-light-gray">{item?.phone}3</div>
            </div>
          </div>
        </div>
        {/* {item?.settings ? item?.settings?.map((setting) => {
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
      }) : ( <>
      </>
      )} */}
        <div className={cn('d-table-cell', styles.rowTable)}>
          <div
            className={cn('text-white px-2 rounded', styles.setting)}
            style={{
              backgroundColor: item?.tier?.color,
            }}
          >
            {item?.tier?.name}
          </div>
        </div>
        <div className={cn('d-table-cell', styles.rowTable)}>
          <div
            className={cn('text-white px-2 rounded', styles.setting)}
            style={{
              backgroundColor: item?.category?.color,
            }}
          >
            {item?.category?.name}
          </div>
        </div>
        <div className={cn('d-table-cell', styles.rowTable)}>
          <div
            className={cn('text-white px-2 rounded', styles.setting)}
            style={{
              backgroundColor: item?.platforms[0]?.color,
            }}
          >
            {item?.platforms[0]?.name}
          </div>
        </div>

        <div className={cn('d-table-cell', styles.rowTable)}>
          <div className={styles.contentCount}>{item?.totalContent}</div>
        </div>
      </div>

      <div className="d-sm-none pb-4 mt-3 w-100 g-0 borderBottomCard">
        <div>
          <div className="d-flex">
            <div className="me-2 d-flex align-items-center">
              <img
                src={item?.avatarUrl}
                className="rounded-circle me-2"
                alt="img avatar"
                width={60}
                height={60}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-avatar.jpg';
                }}
              ></img>
            </div>
            <div>
              <div>{item?.username}</div>
              <div className="fs-7 text-light-gray my-1">{item?.phone}</div>
              <div className="d-flex">
                <div
                  className={cn(
                    'text-white px-2 py-1 rounded my-1',
                    styles.setting,
                  )}
                  style={{
                    backgroundColor: item?.tier?.color,
                  }}
                >
                  {item?.tier?.name}
                </div>
                <div className={cn('d-flex px-2 ms-2 align-items-center')}>
                  {index < 3 ? (
                    <div className={styles.ranking}>#{index + 1}</div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="color4">Category</div>
          <div
            className={cn('text-white px-2 rounded', styles.setting)}
            style={{
              backgroundColor: item?.category?.color,
            }}
          >
            {item?.category?.name}
          </div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="color4">Platform</div>
          <div
            className={cn('text-white px-2 rounded', styles.setting)}
            style={{
              backgroundColor: item?.platforms[0]?.color,
            }}
          >
            {item?.platforms[0]?.name}
          </div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="color4">Content</div>
          <div className={styles.contentCount}>{item?.totalContent}</div>
        </div>
      </div>
    </>
  );
}
