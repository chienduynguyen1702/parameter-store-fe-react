import { useNavigate } from 'react-router';

import cn from 'classnames';
import styles from './Row.module.sass';

import { Link } from 'react-router-dom';

import useQueryString from '../../../../../../hooks/useQueryString';

import { Row as Brow } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

import Avatar from '../../../../../../components/Avatar';

const Row = ({ item, index }) => {
  const navigate = useNavigate();

  const { queryString } = useQueryString();

  return (
    <>
      <Brow className={cn(styles.row)}>
        {/* Rank */}
        <Col xs={1} className={cn(styles.col)}>
          {index === 0 && (
            <div
              className={cn(
                { [styles.rank]: index === 0 },
                { [styles.orange]: index === 0 },
              )}
            >
              #1
            </div>
          )}
          {index === 1 && (
            <div
              className={cn(
                { [styles.rank]: index === 1 },
                { [styles.green]: index === 1 },
              )}
            >
              #2
            </div>
          )}
          {index === 2 && (
            <div
              className={cn(
                { [styles.rank]: index === 2 },
                { [styles.purple]: index === 2 },
              )}
            >
              #3
            </div>
          )}
        </Col>

        {/* Ava and name */}
        <Col xs={4} className={cn(styles.col, styles.user_col)}>
          <div className={styles.item}>
            <div className={styles.avatar}>
              <Avatar image={item?.avatarUrl} />
            </div>
            <div
              className={styles.details}
              onClick={() => {
                navigate(`/koc-profile/${item?.id}/tiktok`, {
                  state: queryString,
                });
              }}
            >
              <div className="d-inline-flex">
                <div className={cn(styles.user, 'pe-2')}>
                  <Link
                    to={`/koc-profile/${item?.id}/tiktok`}
                    className={cn(styles.linkInUsername)}
                  >
                    {item?.username}
                  </Link>
                </div>
              </div>

              <div className={cn(styles.phoneNumber, 'cursor-pointer')}>
                <a className={styles.phoneNumber} href={`tel:+${item?.phone}`}>
                  {item?.phone}
                </a>
              </div>
            </div>
          </div>
        </Col>

        {/* Tier */}
        <Col xs={2} className={cn(styles.col)}>
          <div className={cn(styles.title)}>Tier</div>
          <div className={cn(styles.left, styles.tier)}>
            <div
              className={cn(styles.text_white, styles.colKoc)}
              style={{
                backgroundColor: item?.tier?.color || '#666',
              }}
            >
              {item?.tier ? item?.tier?.name : 'Select'}
            </div>
          </div>
        </Col>

        {/* Platform */}
        <Col xs={2} className={cn(styles.col)}>
          <div className={cn(styles.title)}>Platform</div>
          <div className={cn(styles.left, styles.platform)}>
            {item?.platforms.length > 0 ? (
              item?.platforms?.map((platform, index) => (
                <div
                  key={index}
                  className={cn(
                    styles.text_white,
                    styles.colKoc,
                    styles.btnPlat,
                  )}
                  style={{
                    backgroundColor: platform.color,
                  }}
                >
                  {platform?.name}
                </div>
              ))
            ) : (
              <div
                className={cn(styles.text_white, styles.colKoc, styles.btnPlat)}
                style={{
                  backgroundColor: '#666',
                }}
              >
                Select
              </div>
            )}
          </div>
        </Col>

        {/* Product sold */}
        <Col xs={3} className={styles.col}>
          <div className={cn(styles.title)}>Product sold</div>
          <div>{item.productSold}</div>
        </Col>
      </Brow>
    </>
  );
};

export default Row;
